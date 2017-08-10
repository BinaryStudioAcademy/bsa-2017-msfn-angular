import { IExerciseType } from './../../models/exercise-type';
import { HttpService } from '../../services/http.service';
import { IHttpReq } from '../../models/http-req';
import { ExerciseTypeService } from '../../services/exercise-type.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-exercise-type',
  templateUrl: './exercise-type.component.html',
  styleUrls: ['./exercise-type.component.scss']
})
export class ExerciseTypeComponent implements OnInit {

  focusedRowCode: number;

  displayedColumns = ['exerciseCode', 'typeName'];
  tableDatabase: TableDatabase;
  dataSource: ExampleDataSource | null;

  addedTemporaryRow = false;


  constructor(private cd: ChangeDetectorRef, public exerciseTypeService: ExerciseTypeService) {
  }




  ngOnInit() {
    this.focusedRowCode = -1;
    this.tableDatabase = new TableDatabase();
    this.dataSource = new ExampleDataSource(this.tableDatabase);
    // This must have because material table have an issue when work with routes

    this.getAllExerciseTypes((result: IExerciseType[]) => {
      this.tableDatabase.addRows(result);
      this.cd.markForCheck();
    });
  }


  clickRow(code: number) {
    this.focusedRowCode = code;
  }

  updateRow(code: number, name: string) {
    if (code) {
      this.exerciseTypeService.updateExerciseTypeByCode(code, name, (data) => {
        this.tableDatabase.updateRow(data.code, data.name);
        this.cd.markForCheck();
      });
    } else {
      this.exerciseTypeService.addExerciseType(name, (data) => {
        this.tableDatabase.addRow(data.code, data.name);
        this.cd.markForCheck();
      });
      this.addedTemporaryRow = false;
    }
    this.focusedRowCode = -1;
  }



  deleteRow(code: number) {
    this.exerciseTypeService.deleteExerciseTypeByCode(code, (data) => {
      this.tableDatabase.deleteRow(code);
      this.cd.markForCheck();
    });
  }


  addRow() {
    this.tableDatabase.addTemporaryRow();
    this.cd.markForCheck();
    this.addedTemporaryRow = true;
    setTimeout(() => {
      const elems: any = document.getElementsByClassName('input-focused');
      console.log(elems);
      elems[0].focus();
    });

  }


  addExerciseType(name: string, callback) {
    this.exerciseTypeService.addExerciseType(name, callback);
  }

  getAllExerciseTypes(callback) {
    return this.exerciseTypeService.getAllExerciseTypes(callback);
  }

  deleteExerciseTypeByCode(code: number, callback) {
    this.exerciseTypeService.deleteExerciseTypeByCode(code, callback);
  }

  updateExerciseTypeByCode(code: number, name: string, callback) {
    this.exerciseTypeService.updateExerciseTypeByCode(code, name, callback);
  }
}






export class TableDatabase {
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  get data(): any[] { return this.dataChange.value; }

  constructor() {
  }

  addRow(code: number, name: string) {
    const copiedData = this.data.slice(0, -1);
    copiedData.push({
      code: code,
      name: name
    });
    this.dataChange.next(copiedData);
  }

  addTemporaryRow() {
    const copiedData = this.data.slice();
    copiedData.push({
      code: null,
      name: ''
    });
    this.dataChange.next(copiedData);
  }

  addRows(rows: IExerciseType[]) {
    this.dataChange.next(rows);
  }

  updateRow(code: number, name: string) {
    const copiedData = this.data.slice();
    copiedData.some(function (element) {
      if (element.code === code) {
        element.name = name;
        return true;
      }
      return false;
    });
    this.dataChange.next(copiedData);
  }


  deleteRow(code: number) {
    const copiedData = this.data.slice();
    let ind = copiedData.length;
    copiedData.some(function (element, index) {
      if (element.code === code) {
        ind = index;
        return true;
      }
      return false;
    });
    copiedData.splice(ind, 1);
    this.dataChange.next(copiedData);
  }
}




export class ExampleDataSource extends DataSource<any> {
  constructor(private _tableDatabase: TableDatabase) {
    super();
  }

  connect(): Observable<any[]> {
    return this._tableDatabase.dataChange;
  }

  disconnect() { }
}
