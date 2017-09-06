import { Component, OnInit, ViewChild } from '@angular/core';
import { TrainingHistoryService } from './training-history.service';
import { DataSource } from '@angular/cdk';
import { MdSort } from '@angular/material';
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
        'date',
        'totalTime',
        'calories'
    ];

    tableDatabase = new TableDatabase(this.trainingHistoryService);
    dataSource: ExampleDataSource | null;
    @ViewChild(MdSort) sort: MdSort;

    constructor(
        private trainingHistoryService: TrainingHistoryService
    ) { }

    ngOnInit() {
        this.dataSource = new ExampleDataSource(this.tableDatabase, this.sort, this.trainingHistoryService);

        this.trainingHistoryService.getLaunchedTrainings(res => {
            this.tableDatabase.addList(res);
        });
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
            if (el.results) {
                copiedData.push({
                    name: el.name,
                    date: this.trainingHistoryService.beautifyDate(el.startDate),
                    totalTime: el.results.time.total,
                    calories: el.results.calories,
                    trainingPlanID: el.trainingPlanID
                });
            }
        });
        this.dataChange.next(copiedData);
    }
}

export class ExampleDataSource extends DataSource<any> {

    constructor(private _exampleDatabase: TableDatabase,
        private _sort: MdSort,
        private service: TrainingHistoryService) {
        super();
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this._exampleDatabase.dataChange,
            this._sort.mdSortChange
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            return this.getSortedData();
        });
    }

    disconnect() { }

    getSortedData(): any[] {
        const data = this._exampleDatabase.data.slice();
        if (!this._sort.active || this._sort.direction === '') {
            return data;
        }

        return this.service.sortData(data, this._sort.active, this._sort.direction);
    }
}

