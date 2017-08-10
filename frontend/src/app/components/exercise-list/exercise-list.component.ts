import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ExerciseListService } from './exercise-list.service';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss'],
  providers: [ExerciseListService]
})

export class ExerciseListComponent implements OnInit {

  displayedColumns = [
    'name',
    'type',
    'description'
  ];
  tableDatabase = new TableDatabase();
  dataSource: ExampleDataSource | null;

  constructor(private cd: ChangeDetectorRef, private exerciseListService: ExerciseListService) { }

  ngOnInit() {
    this.dataSource = new ExampleDataSource(this.tableDatabase);
    setTimeout(() => this.cd.markForCheck());
    this.getExercises((result) => {
      this.tableDatabase.addExercises(result);
    });
  }

  getExercises(callback) {
    return this.exerciseListService.getExercises(callback);
  }
}

export class TableDatabase {
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  get data(): any[] {
    return this.dataChange.value;
  }

  constructor() { }

  addExercises(data) {
    for (let i = 0; i < data.length; i++) {
      const copiedData = data.slice();
      copiedData.push(data[i]);
      this.dataChange.next(copiedData);
    }
  }
}

export class ExampleDataSource extends DataSource<any> {
  constructor(private _tableDatabase: TableDatabase) {
    super();
  }

  connect(): Observable<any[]> {
    return this._tableDatabase.dataChange;
  }

  disconnect() {}
}