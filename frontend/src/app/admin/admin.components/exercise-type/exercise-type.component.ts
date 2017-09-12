import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';
import { ExerciseTypeService } from './exercise-type.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-exercise-type',
    templateUrl: './exercise-type.component.html',
    styleUrls: ['./exercise-type.component.scss'],
    providers: [ExerciseTypeService]
})
export class ExerciseTypeComponent implements OnInit {

    focusedRowId: string;

    displayedColumns = ['exerciseId', 'typeName'];
    tableDatabase: TableDatabase;
    dataSource: ExampleDataSource | null;
    firstShow = true;
    wrongInput = false;
    addedTemporaryRow = false;
    loaded = false;


    constructor(private cd: ChangeDetectorRef, public exerciseTypeService: ExerciseTypeService) {
    }

    ngOnInit() {
        this.focusedRowId = '-1';
        this.tableDatabase = new TableDatabase();
        this.dataSource = new ExampleDataSource(this.tableDatabase);
        // This must have because material table have an issue when work with routes

        this.exerciseTypeService.getAllExerciseTypes((result: ExerciseApi.IExerciseType[]) => {
            this.loaded = this.tableDatabase.addRows(result) === 0 ? false : true;
            this.cd.markForCheck();
        });
    }

    clickRow(id: string) {
        this.focusedRowId = id;
        console.log(this.focusedRowId);
    }

    updateRow(id: string, body) {
        this.firstShow = false;
        if (body.name === '') {
            if (!id) {
                this.wrongInput = true;
            }
            this.focusedRowId = '-1';
            return;
        } else {
            if (!id) {
                this.wrongInput = false;
            }
        }
        if (id) {
            this.exerciseTypeService.updateExerciseTypeById(id, body, (data) => {
                this.loaded = this.tableDatabase.updateRow(id, body) === 0 ? false : true;
                this.cd.markForCheck();
            });
        } else {
            this.exerciseTypeService.addExerciseType(body.name, (data) => {
                this.loaded = this.tableDatabase.addRow(data._id, body.name) === 0 ? false : true;
                this.cd.markForCheck();
            });
            this.addedTemporaryRow = false;
        }
        this.focusedRowId = '-1';
    }

    deleteRow(id: string) {
        this.exerciseTypeService.deleteExerciseTypeById(id, (data) => {
            this.loaded = this.tableDatabase.deleteRow(id) === 0 ? false : true;
            this.cd.markForCheck();
        });
    }

    addRow() {
        if (this.wrongInput) {
            return;
        }
        this.wrongInput = true;
        this.firstShow = true;
        this.loaded = this.tableDatabase.addTemporaryRow() === 0 ? false : true;
        // console.log(this.loaded);
        this.cd.markForCheck();
        this.addedTemporaryRow = true;
        setTimeout(() => {
            const elems: any = document.getElementsByClassName('input-focused');
            elems[0].focus();
        });

    }

}






export class TableDatabase {
    dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    get data(): any[] { return this.dataChange.value; }

    constructor() {
    }

    addRow(id: string, name: string) {
        let copiedData = [];
        if (this.data && this.data instanceof Array) {
            copiedData = this.data.slice(0, -1);
        }
        if (name === '') {
            return copiedData.length;
        }
        copiedData.push({
            _id: id,
            name: name,
            isRemoved: false
        });
        copiedData = copiedData.map((elem, i) => {
            const newElem = Object.assign(elem, {index: i + 1});
            return newElem;
        });
        this.dataChange.next(copiedData);
        return copiedData.length;
    }

    addTemporaryRow() {
        let copiedData = [];
        if (this.data && this.data instanceof Array) {
            copiedData = this.data.slice();
        }
        copiedData.push({
            _id: null,
            name: '',
            isRemoved: false,
            index: null
        });
        this.dataChange.next(copiedData);
        return copiedData.length;
    }

    addRows(rows: ExerciseApi.IExerciseType[]) {
        if (!rows || !(rows instanceof Array) || !rows.length || (!rows[0].name && !rows[0]._id && rows.length === 1)) {
            return 0;
        }
        rows = rows.map((elem, i) => {
            const newElem = Object.assign(elem, {index: i + 1});
            return newElem;
        });
        this.dataChange.next(rows);
        return rows.length;
    }

    updateRow(id: string, body) {
        if (!this.data || !(this.data instanceof Array)) {
            return 0;
        }
        const copiedData = this.data.slice();
        if (body.name === '') {
            return copiedData.length;
        }
        copiedData.some(function (element) {
            if (element._id === id) {
                element = Object.assign(element, body);
                return true;
            }
            return false;
        });
        this.dataChange.next(copiedData);
        return copiedData.length;
    }


    deleteRow(id: string) {
        if (!this.data || !(this.data instanceof Array)) {
            return 0;
        }
        let copiedData = this.data.slice();
        let ind = copiedData.length;
        copiedData.some(function (element, index) {
            if (element._id === id) {
                ind = index;
                return true;
            }
            return false;
        });
        copiedData.splice(ind, 1);
        copiedData = copiedData.map((elem, i) => {
            const newElem = Object.assign(elem, {index: i + 1});
            return newElem;
        });
        this.dataChange.next(copiedData);
        return copiedData.length;
    }
}




export class ExampleDataSource extends DataSource<ExerciseApi.IExerciseType> {
    constructor(private _tableDatabase: TableDatabase) {
        super();
    }

    connect(): Observable<ExerciseApi.IExerciseType[]> {
        return this._tableDatabase.dataChange;
    }

    disconnect() { }
}
