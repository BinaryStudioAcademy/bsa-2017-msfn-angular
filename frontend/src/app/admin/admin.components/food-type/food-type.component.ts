import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataSource } from '@angular/cdk/table';
import { MdDialog, MdSort } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { IFoodType } from '../../../models/food-type';
import { FoodTypeEditDialogComponent } from '../food-type-edit-dialog/food-type-edit-dialog.component';

@Component({
    selector: 'app-food-type',
    templateUrl: './food-type.component.html',
    styleUrls: ['./food-type.component.scss'],
    providers: [FoodService]
})
export class FoodTypeComponent implements OnInit {
    displayedColumns = [
        'name',
        'description',
        'parent',
        'delete'
    ];
    tableDatabase = new TableDatabase();
    dataSource: FoodTypeDataSource | null;
    @ViewChild(MdSort) sort: MdSort;
    @ViewChild('filter') filter: ElementRef;

    constructor(private cd: ChangeDetectorRef,
                private foodService: FoodService,
                private mdDialog: MdDialog) {
        mdDialog.afterAllClosed
            .subscribe(() => {
                this.foodService.getAllFoodTypes( (response) => {
                    this.tableDatabase.addFoodTypes(response);
                });
            });
    }

    ngOnInit() {
        this.dataSource = new FoodTypeDataSource(
            this.tableDatabase,
            this.sort,
            this.foodService
        );
        setTimeout(() => this.cd.markForCheck());
        this.foodService.getAllFoodTypes( (response) => {
            this.tableDatabase.addFoodTypes(response);
        });

        Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
                if (!this.dataSource) { return; }
                this.dataSource.filter = this.filter.nativeElement.value;

            });
    }


    openFoodTypeEditDialog(newItem: boolean, foodTypeData: IFoodType) {
        const foodType = newItem ? { name: '', description: ''} : foodTypeData;
        this.mdDialog.open(FoodTypeEditDialogComponent, {
            data: {
                newItem,
                foodType
            }
        });
    }

    toggle(row) {
        this.tableDatabase.toggleRemoved(row);
        this.foodService.updateFoodType(row, () => {
            this.cd.markForCheck();
        });
    }

}
export class TableDatabase {
    dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    get data(): any[] {
        return this.dataChange.value;
    }

    constructor() { }

    addFoodTypes(data) {
        const copiedData = [...data];
        this.dataChange.next(copiedData);
    }

    toggleRemoved(row) {
        const index = this.data.indexOf(row);
        const copiedData = this.data.slice();
        copiedData[index].isRemoved = !copiedData[index].isRemoved;
        this.dataChange.next(copiedData);
    }

    addNewFoodType(name: string, description?: string) {
        const copiedData = this.data.slice();
        copiedData.push(this.createType(name, description));
        this.dataChange.next(copiedData);
    }

    private createType( name: string,
                        description?: string
    )  {
        return {
            name,
            description,
        };
    }

}
export class FoodTypeDataSource extends DataSource<IFoodType> {
    _filterChange = new BehaviorSubject('');
    get filter(): string { return this._filterChange.value; }
    set filter(filter: string) { this._filterChange.next(filter); }

    constructor(private _tableDatabase: TableDatabase,
                private _sort: MdSort,
                private service: FoodService) {
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
                const searchStr = (item.name + item.description).toLowerCase();
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
        return this.service.sortfoodTypesData(data, this._sort.active, this._sort.direction);
    }
}

