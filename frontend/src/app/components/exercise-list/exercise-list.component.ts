import { Component, ViewChild, OnInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { DataSource } from '@angular/cdk';
import { MdSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { ExerciseListService } from './exercise-list.service';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss'],
  providers: [ExerciseListService]
})

export class ExerciseListComponent implements OnInit {

  name = '';
  displayedColumns = [
    'name',
    'type',
    'description'
  ];
  tableDatabase = new TableDatabase();
  dataSource: ExampleDataSource | null;
  @ViewChild(MdSort) sort: MdSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(private cd: ChangeDetectorRef, private exerciseListService: ExerciseListService) { }

  ngOnInit() {
    this.dataSource = new ExampleDataSource(this.tableDatabase, this.sort, this.exerciseListService);
    setTimeout(() => this.cd.markForCheck());
    this.getExercises((result) => {
      this.tableDatabase.addExercises(result);
    });


    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
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
  _filterChange = new BehaviorSubject('');
  get filter(): string {
    return this._filterChange.value;
  }
  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  constructor(private _exampleDatabase: TableDatabase, private _sort: MdSort, private service: ExerciseListService) {
    super();
  }

  connect(): Observable<any[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.mdSortChange,
      this._filterChange
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this.getSortedData().slice().filter((item) => {
        const searchStr = (item.name).toLowerCase();
        return searchStr.includes(this.filter.toLowerCase());
      });
    });
  }

  disconnect() {}

  getSortedData(): any[] {
    const data = this._exampleDatabase.data.slice();
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return this.service.sortData(data, this._sort.active, this._sort.direction);
  }
}
