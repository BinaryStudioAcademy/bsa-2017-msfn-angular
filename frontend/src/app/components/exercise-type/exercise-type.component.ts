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


  displayedColumns = ['exerciseCode', 'typeName'];
  tableDatabase: TableDatabase;
  dataSource: ExampleDataSource | null;



  constructor(private cd: ChangeDetectorRef, public exerciseTypeService: ExerciseTypeService) {
  }



  ngOnInit() {
    this.tableDatabase = new TableDatabase();
    this.dataSource = new ExampleDataSource(this.tableDatabase);
    // This must have because material table have an issue when work with routes
    setTimeout(() => this.cd.markForCheck());

    this.getAllExerciseTypes((result: IExerciseType[]) => {
      this.tableDatabase.addRows(result);
      this.cd.markForCheck();
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

  addRow(row: IExerciseType) {
    const copiedData = this.data.slice();
    copiedData.push(row);
    this.dataChange.next(copiedData);
  }

  addRows(rows: IExerciseType[]) {
    this.dataChange.next(rows);
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
