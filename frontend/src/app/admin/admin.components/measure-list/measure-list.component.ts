import {ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MeasureListService } from './measure-list.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DataSource} from '@angular/cdk';
import {MdSort} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import IMeasurementType = MeasurementApi.IMeasurementType;
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-measure-list',
    templateUrl: './measure-list.component.html',
    styleUrls: ['./measure-list.component.scss'],
    providers: [MeasureListService]
})
export class MeasureListComponent implements OnInit {
    options = [];
    items = [];
    measureName = '';
    conversionFactor = '';
    unitName = '';
    displayedColumns = [
        'code',
        'measureName',
        'delete'
    ];
    tableDatabase = new TableDatabase();
    dataSource: MeasureTypeDataSource | null;
    @ViewChild(MdSort) sort: MdSort;
    @ViewChild('filter') filter: ElementRef;


    constructor(private changeDetectorRef: ChangeDetectorRef,
                public measurementService: MeasureListService,
                private router: Router,
                private route: ActivatedRoute) {

    }


    ngOnInit() {
        this.dataSource = new MeasureTypeDataSource(
            this.tableDatabase,
            this.sort,
            this.measurementService);
        setTimeout(() => this.changeDetectorRef.markForCheck());
        this.measurementService.getAllMeasurements( (response) => {
            this.tableDatabase.addMeasurement(response);
            for (let i = 0; i < response.length; i++) {
                this.options.push(response.measureName);
            }
            this.options = Array.from((new Set(this.options)));
        });

        Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
                if (!this.dataSource) { return; }
            });
    }

    updateTable() {}

    addRow() {

    }

    deleteRow() {

    }

    addMeasure() {
        this.router.navigate(['../measure'], {relativeTo: this.route});
    }
    onClickName(measureName: string) {
        const id = this.tableDatabase.data.find(
            item => item.measureName === measureName)._id;
        this.router.navigate(['../measure/', id], {relativeTo: this.route});
    }

}

export class TableDatabase {
    dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    get data(): any[] {
        return this.dataChange.value;
    }

    constructor() { }

    addMeasurement(data) {
        const getCode = (() => {
            let current = 0;
            return () => current += 1;
        })();
        const copiedData = [...data];
        this.dataChange.next(copiedData
            .map( obj => Object.assign(obj, { code: getCode() }))
        );
    }
}

export class MeasureTypeDataSource extends DataSource<any> {

    constructor(private tableDatabase: TableDatabase,
                private _sort: MdSort,
                private service: MeasureListService) {
        super();
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this.tableDatabase.dataChange,
            this._sort.mdSortChange,
        ];

        return Observable.merge(...displayDataChanges).map(() => {
            return this.getSortedData();
        });
    }

    disconnect() {
    }

    getSortedData(): any[] {
        const data = this.tableDatabase.data.slice();
        if (!this._sort.active || this._sort.direction === '') {
            return data;
        }

        return this.service.sortData(data, this._sort.active, this._sort.direction);
    }
}
