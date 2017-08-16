import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MeasureListService } from './measure-list.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DataSource} from '@angular/cdk';
import {MdSort} from '@angular/material';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-measure-list',
    templateUrl: './measure-list.component.html',
    styleUrls: ['./measure-list.component.scss'],
    providers: [MeasureListService]
})
export class MeasureListComponent implements OnInit {
    options = [];
    items = [];
    name = '';
    displayedColumns = [
        'code',
        'name',
        'type'
    ];
    tableDatabase = new TableDatabase();
    dataSource: ExampleDataSource | null;
    @ViewChild(MdSort) sort: MdSort;
    @ViewChild('filter') filter: ElementRef;


    constructor(private changeDetectorRef: ChangeDetectorRef,
                private measureListService: MeasureListService) { }


    ngOnInit() {
        this.dataSource = new ExampleDataSource(
            this.tableDatabase,
            this.sort,
            this.measureListService);
        setTimeout(() => this.changeDetectorRef.markForCheck());
        this.getMeasures((res) => {
            this.tableDatabase.addMeasures(res);
            for (let i = 0; i < res.length; i++) {
                this.options.push(res[i].type);
            }
        });
    }

    updateTable() {
        setTimeout( () => {
            this.dataSource.itemFilter = this.items.toString();
        }, 200);
    }
    getMeasures(callback) {
        return this.measureListService.getMeasures(callback);
    }
    addRow() {

    }
}

export class TableDatabase {
    dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    get data(): any[] {
        return this.dataChange.value;
    }

    constructor() { }

    addMeasures(data) {
        const copiedData = [...data];
        this.dataChange.next(copiedData);
    }
}

export class ExampleDataSource extends DataSource<any> {
    _filterChange = new BehaviorSubject('');

    get filter(): string {
        return this._filterChange.value;
    }

    set filter(filter: string) {
        this._filterChange.next(filter);
    }

    _itemFilterChange = new BehaviorSubject('');

    get itemFilter(): string {
        return this._itemFilterChange.value;
    }

    set itemFilter(filter: string) {
        this._itemFilterChange.next(filter);
    }

    constructor(private _exampleDatabase: TableDatabase,
                private _sort: MdSort,
                private service: MeasureListService) {
        super();
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this._exampleDatabase.dataChange,
            this._sort.mdSortChange,
            this._filterChange,
            this._itemFilterChange
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            return this.getSortedData().slice().filter((item) => {
                const searchStr = (item.name).toLowerCase();
                const searchType = (item.type).toLowerCase();

                if (this.itemFilter) {
                    return this.itemFilter.toLowerCase().includes(searchType) &&
                        searchStr.includes(this.filter.toLowerCase());
                } else {
                    return searchStr.includes(this.filter.toLowerCase());
                }
            });
        });
    }

    disconnect() {
    }

    getSortedData(): any[] {
        const data = this._exampleDatabase.data.slice();
        if (!this._sort.active || this._sort.direction === '') {
            return data;
        }

        return this.service.sortData(data, this._sort.active, this._sort.direction);
    }
}
