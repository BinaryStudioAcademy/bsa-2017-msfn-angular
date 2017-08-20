import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MeasureListService } from './measure-list.service';
import { BehaviorSubject} from 'rxjs/BehaviorSubject';
import { DataSource } from '@angular/cdk';
import { MdSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-measure-list',
    templateUrl: './measure-list.component.html',
    styleUrls: ['./measure-list.component.scss'],
    providers: [MeasureListService]
})
export class MeasureListComponent implements OnInit {
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
        });

        Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
                if (!this.dataSource) { return; }
                this.dataSource.filter = this.filter.nativeElement.value;

            });
    }

    updateTable() {}
    toggle(row) {
        this.tableDatabase.toggleRemoved(row);
        this.measurementService.updateMeasurementFull(row, (response) => {
            this.tableDatabase.updateMeasurement(response);
        });
        debugger;
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

    updateMeasurement(row) {
        const index = this.data.indexOf(row);
        const copiedData = this.data.slice();
        copiedData[index].isRemoved = !copiedData[index].isRemoved;
        this.dataChange.next(copiedData);
    }

    toggleRemoved(row) {
        const index = this.data.indexOf(row);
        const copiedData = this.data.slice();
        copiedData[index].isRemoved = !copiedData[index].isRemoved;
        this.dataChange.next(copiedData);
    }
}

export class MeasureTypeDataSource extends DataSource<any> {
    _filterChange = new BehaviorSubject('');
    get filter(): string { return this._filterChange.value; }
    set filter(filter: string) { this._filterChange.next(filter); }

    constructor(private _tableDatabase: TableDatabase,
                private _sort: MdSort,
                private service: MeasureListService) {
        super();
    }

    connect(): Observable<any[]> {
        const displayDataChanges = [
            this._tableDatabase.dataChange,
            this._sort.mdSortChange,
            this._filterChange,
        ];
        return Observable.merge(...displayDataChanges).map(() => {
            return this.getSortedData().slice().filter((item) => {
                const searchStr = (item.measureName).toLowerCase();
                return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
            });
        });

    }

    disconnect() {
    }

    getSortedData(): any[] {
        const data = this._tableDatabase.data.slice();
        if (!this._sort.active || this._sort.direction === '') {
            return data;
        }
        return this.service.sortData(data, this._sort.active, this._sort.direction);
    }
}
