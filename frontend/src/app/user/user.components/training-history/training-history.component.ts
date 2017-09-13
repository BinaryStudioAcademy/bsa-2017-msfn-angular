import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TrainingHistoryService } from './training-history.service';
import { DataSource } from '@angular/cdk/table';
import { MdSort, MdPaginator } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

@Component({
    selector: 'app-training-history',
    templateUrl: './training-history.component.html',
    styleUrls: ['./training-history.component.scss'],
    providers: [TrainingHistoryService]
})
export class TrainingHistoryComponent implements OnInit {
    displayedColumns = [
        'name',
        'type',
        'date',
        'totalTime',
        'calories'
    ];
    totalTrainingTime;
    totalBurnedCalories;

    period = {
        to: new Date(),
        from: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7)
    };
    minMaxCalendarDate = new Date();

    tableDatabase = new TableDatabase(this.trainingHistoryService);
    dataSource: ExampleDataSource | null;
    @ViewChild(MdSort) sort: MdSort;
    @ViewChild('filter') filter: ElementRef;
    @ViewChild(MdPaginator) paginator: MdPaginator;

    constructor(
        private trainingHistoryService: TrainingHistoryService
    ) { }

    ngOnInit() {
        this.dataSource = new ExampleDataSource(this.tableDatabase, this.sort, this.trainingHistoryService, this.paginator);

        this.trainingHistoryService.getLaunchedTrainings(res => {
            this.tableDatabase.addList(res);
            this.createInfo();
        });

        Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
                if (!this.dataSource) { return; }
                this.dataSource.filter = this.filter.nativeElement.value;
            });

        this.dataSource.filterDate = this.period;
    }

    updateData(event) {
        if (event === 'to') {
            this.period.to = new Date(this.period.to.getTime() + 1000 * 60 * 60 * 24 - 1000 * 60);
        }
        this.dataSource.filterDate = this.period;
    }

    createInfo() {
        this.totalBurnedCalories = 0;
        this.totalTrainingTime = 0;
        this.tableDatabase.data.forEach(el => {
            this.totalTrainingTime = this.totalTrainingTime + el.totalTime.seconds;
            this.totalBurnedCalories = this.totalBurnedCalories + el.calories;
        });

        this.totalTrainingTime = this.trainingHistoryService.beautifyTotalTime(this.totalTrainingTime);
    }
}

export class TableDatabase {
    dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    get data(): any[] {
        return this.dataChange.value;
    }

    constructor(private trainingHistoryService: TrainingHistoryService) { }

    addList(data) {
        const copiedData = [];
        data.forEach(el => {
            if (el.results.time.total) {
                copiedData.push({
                    name: el.name,
                    date: {
                        display: this.trainingHistoryService.beautifyDate(el.startDate),
                        raw: el.startDate
                    },
                    totalTime: {
                        display: el.results.time.total,
                        seconds: this.trainingHistoryService.getSeconds(el.results.time.total)
                    },
                    calories: el.results.calories,
                    id: el._id,
                    type: el.trainingType,
                });
            }
        });
        this.dataChange.next(copiedData);
    }
}

export class ExampleDataSource extends DataSource<any> {
    _filterChange = new BehaviorSubject('');
    get filter(): string { return this._filterChange.value; }
    set filter(filter: string) { this._filterChange.next(filter); }

    _filterDateChange = new BehaviorSubject('');
    get filterDate(): any { return this._filterDateChange.value; }
    set filterDate(filter: any) { this._filterDateChange.next(filter); }

    constructor(private _exampleDatabase: TableDatabase,
        private _sort: MdSort,
        private service: TrainingHistoryService,
        private _paginator: MdPaginator) {
        super();
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this._exampleDatabase.dataChange,
            this._sort.mdSortChange,
            this._filterChange,
            this._filterDateChange,
            this._paginator.page,
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            return this.getSortedData().slice().filter((item) => {
                const query = this.filter.toLowerCase(),
                    itemName = (item.name).toLowerCase();
                return itemName
                    .includes(query) &&
                    Date.parse(item.date.raw) > Date.parse(this.filterDate.from) &&
                    Date.parse(item.date.raw) < Date.parse(this.filterDate.to);
            });
        });
    }

    disconnect() { }

    getSortedData(): any[] {
        const data = this._exampleDatabase.data.slice();
        if (!this._sort.active || this._sort.direction === '') {
            return data;
        }

        const sortedDate = this.service.sortData(data, this._sort.active, this._sort.direction);
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        return sortedDate.splice(startIndex, this._paginator.pageSize);
    }
}

