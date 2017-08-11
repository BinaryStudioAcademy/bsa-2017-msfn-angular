import { Component, ViewChild, OnInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { DataSource } from '@angular/cdk';
import { MdSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { UserListService } from './user-list.service';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [UserListService]
})

export class UserListComponent implements OnInit {
  name = '';
  displayedColumns = [
    'firstName',
    'lastName',
    'email',
    'role',
    'birthday',
    'gender'
  ];
  tableDatabase = new TableDatabase();
  dataSource: ExampleDataSource | null;
  @ViewChild(MdSort) sort: MdSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(private cd: ChangeDetectorRef,
              private userListService: UserListService) { }

  ngOnInit() {
    this.dataSource = new ExampleDataSource(this.tableDatabase,
      this.sort,
      this.userListService);

    setTimeout(() => this.cd.markForCheck());
    this.getUsers((result) => {
      this.tableDatabase.addUsers(result);
    });

    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  getUsers(callback) {
    return this.userListService.getUsers(callback);
  }
}

export class TableDatabase {
  dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  get data(): any[] {
    return this.dataChange.value;
  }

  constructor() { }

  addUsers(data) {
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

  constructor(private _exampleDatabase: TableDatabase,
              private _sort: MdSort,
              private service: UserListService) {
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
        const searchFirstName = (item.firstName).toLowerCase();
        const searchLastName = (item.lastName).toLowerCase();
        const searchRole = (item.role).toLowerCase();
        return (searchFirstName.includes(this.filter.toLowerCase()) ||
                searchLastName.includes(this.filter.toLowerCase()) ||
                searchRole.includes(this.filter.toLowerCase()));
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
