import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {DataSource} from '@angular/cdk';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-exercise-type',
  templateUrl: './exercise-type.component.html',
  styleUrls: ['./exercise-type.component.scss']
})
export class ExerciseTypeComponent implements OnInit {
  displayedColumns = ['exerciseId', 'typeName'];
  tableDatabase = new TableDatabase();
  dataSource: ExampleDataSource | null;
  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
     this.dataSource = new ExampleDataSource(this.tableDatabase);
     // This must have because material table have an issue when work with routes
     setTimeout(() => this.cd.markForCheck());
  }

}

export class TableDatabase {
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  get data(): any[] { return this.dataChange.value; }

  constructor() {
    this.addRow();
  }

  addRow() {
    const copiedData = this.data.slice();
    copiedData.push({
       id: 0,
       name: 'running'
     });
    copiedData.push({
       id: 1,
       name: 'swimming'
     });
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

  disconnect() {}
}
