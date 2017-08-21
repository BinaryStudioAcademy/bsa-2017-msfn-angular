import { Component, ViewChild, OnInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { DataSource } from '@angular/cdk';
import { MdSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { UserListService } from './user-list.service';
import { ToasterService } from '../../../services/toastr.service';
import { AdminService } from '../../services/admin.service';
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
    providers: [
        UserListService,
        AdminService
    ]
})

export class UserListComponent implements OnInit {
    searchInput = '';
    displayedColumns = [
        'firstName',
        'lastName',
        'email',
        'role',
        'age',
        'gender'
    ];

    tableDatabase = new TableDatabase(this.userListService);
    dataSource: ExampleDataSource | null;
    @ViewChild(MdSort) sort: MdSort;
    @ViewChild('filter') filter: ElementRef;

    constructor(private cd: ChangeDetectorRef,
                private adminService: AdminService,
                private userListService: UserListService,
                private toasterService: ToasterService) { }

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

    acceptCoachRequest(user) {
        const userData = {
            isCoach: true
        };
        this.sendUserData(user, 'coach', userData);
    }

    rejectCoachRequest(user) {
        this.sendUserData(user, 'usual');
    }

    sendUserData(user, role, data?) {
        this.adminService.processCoachRequest(user._id, data, res => {
            if (typeof(res) === 'object') {
                this.toasterService.showMessage('success', null);
                user.requestForCoaching = false;
                user.role = role;
            } else {
                this.toasterService.showMessage('error', null);
            }
        });
    }
}

export class TableDatabase {
    dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    get data(): any[] {
        return this.dataChange.value;
    }

    constructor(private userListService: UserListService) { }

    addUsers(data) {
        let copiedData = [...data];
        console.log(copiedData);
        copiedData = copiedData.filter((elem) => {
            return elem.role !== 'admin';
        });
        for (let i = 0; i < copiedData.length; i++) {
            const age = this.userListService.getAge(copiedData[i].birthday);
            copiedData[i].age = age;
        }
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
                const query = this.filter.toLowerCase(),
                    searchFirstName = (item.firstName).toLowerCase(),
                    searchLastName = (item.lastName).toLowerCase(),
                    searchEmail = (item.email).toLowerCase(),
                    searchRole = (item.role).toLowerCase();

                return (searchFirstName.includes(query) ||
                        searchLastName.includes(query) ||
                        searchEmail.includes(query) ||
                        searchRole.includes(query));
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
