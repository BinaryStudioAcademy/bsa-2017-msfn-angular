import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';
import { GoalListService } from './goal-list.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataSource } from '@angular/cdk';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-goal-list',
    templateUrl: './goal-list.component.html',
    styleUrls: ['./goal-list.component.scss'],
    providers: [GoalListService]
})
export class GoalListComponent implements OnInit {

    focusedRowId: number;

    displayedColumns = ['Type', 'Name'];
    goalTypes: any[];
    tableDatabase: TableDatabase;
    dataSource: ExampleDataSource | null;
    firstShow = true;
    wrongInput = false;
    addedTemporaryRow = false;
    loaded = false;


    constructor(private cd: ChangeDetectorRef, public goalListService: GoalListService) {
    }

    ngOnInit() {
        this.goalListService.getGoalTypes((res) => {
            console.log(res);
            this.goalTypes = res;
        });
        this.focusedRowId = -1;
        this.tableDatabase = new TableDatabase();
        this.dataSource = new ExampleDataSource(this.tableDatabase);

        this.goalListService.getGoals((result: GoalApi.IGoal[]) => {
            this.loaded = this.tableDatabase.addRows(result) === 0 ? false : true;
            this.cd.markForCheck();
        });
    }

    clickRow(id: number) {
        this.focusedRowId = id;
    }

    updateRow(id: number, body) {
        this.firstShow = false;
        if (body.name === '') {
            if (!id) {
                this.wrongInput = true;
            }
            this.focusedRowId = -1;
            return;
        } else {
            if (!id) {
                this.wrongInput = false;
            }
        }
        if (id) {
            this.goalListService.updateGoal(id, body, (data) => {
                this.loaded = this.tableDatabase.updateRow(id, body) === 0 ? false : true;
                this.cd.markForCheck();
            });
        } else {
            this.goalListService.createGoal(body, (data) => {
                this.loaded = this.tableDatabase.addRow(data) === 0 ? false : true;
                this.cd.markForCheck();
            });
            this.addedTemporaryRow = false;
        }
        this.focusedRowId = -1;
    }

    deleteRow(id: number) {
        this.goalListService.deleteGoal(id, (data) => {
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
        this.loaded = this.tableDatabase.addTemporaryRow(this.goalTypes[0].name || '') === 0 ? false : true;
        // console.log(this.loaded);
        this.cd.markForCheck();
        this.addedTemporaryRow = true;
        setTimeout(() => {
            const elems: any = document.getElementsByClassName('input-focused');
            // console.log(elems);
            elems[0].focus();
        });

    }

}




export class TableDatabase {
    dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    get data(): any[] { return this.dataChange.value; }

    constructor() {
    }

    addRow(body) {
        let copiedData = [];
        if (this.data && this.data instanceof Array) {
            copiedData = this.data.slice(0, -1);
        }
        if (body.name === '') {
            return copiedData.length;
        }
        copiedData.push({
            _id: body._id,
            name: body.name,
            type: body.type,
            isRemoved: false
        });
        console.log('AddRow: ', body);
        console.log(copiedData);
        this.dataChange.next(copiedData);
        return copiedData.length;
    }

    addTemporaryRow(defaultType: string) {
        let copiedData = [];
        if (this.data && this.data instanceof Array) {
            copiedData = this.data.slice();
        }
        copiedData.push({
            id: null,
            type: defaultType,
            name: '',
            isRemoved: false
        });
        this.dataChange.next(copiedData);
        return copiedData.length;
    }

    addRows(rows: GoalApi.IGoal[]) {
        if (!rows || !(rows instanceof Array) || !rows.length || (!rows[0].name && rows.length === 1)) {
            return 0;
        }
        this.dataChange.next(rows);
        return rows.length;
    }

    updateRow(id: number, body) {
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


    deleteRow(id: number) {
        if (!this.data || !(this.data instanceof Array)) {
            return 0;
        }
        const copiedData = this.data.slice();
        let ind = copiedData.length;
        copiedData.some(function (element, index) {
            if (element._id === id) {
                ind = index;
                return true;
            }
            return false;
        });
        copiedData.splice(ind, 1);
        this.dataChange.next(copiedData);
        return copiedData.length;
    }
}




export class ExampleDataSource extends DataSource<GoalApi.IGoal> {
    constructor(private _tableDatabase: TableDatabase) {
        super();
    }

    connect(): Observable<GoalApi.IGoal[]> {
        return this._tableDatabase.dataChange;
    }

    disconnect() { }
}
