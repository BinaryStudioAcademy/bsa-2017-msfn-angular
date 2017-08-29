import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk';
import 'rxjs/add/observable/of';

@Component({
    selector: 'app-interval-training-plan',
    templateUrl: './interval-training-plan.component.html',
    styleUrls: ['./interval-training-plan.component.scss']
})
export class IntervalTrainingPlanComponent implements OnInit {

    @Input() intervalList: [any];
    @Output() intervalAction = new EventEmitter;
    displayedColumns = ['name', 'time'];
    dataSource: any;
    editMode: boolean;
    circles = [];

    currentLap = {
        lapTime: 0,
        warmTime: 0,
        index: 0
    };

    constructor() {}

    ngOnInit(): void {
        console.log(this.intervalList);
        // this.circles = this.intervalList;
    }

    addCircle() {
        if (this.circles.length) {
            this.circles.push({
                lapTime: 0,
                warmTime: 0
            });
            this.edit(this.circles.length - 1, true);
        } else {
            this.editMode = true;
        }
        this.intervalAction.emit({type: 'add'});
    }

    saveCircle(): void {
        const data = {
            lapTime: this.currentLap.lapTime,
            warmTime: this.currentLap.warmTime
        };
        this.circles[this.currentLap.index] = data;
        this.editMode = false;
        this.intervalAction.emit(
            {
                type: 'save',
                data: data,
                cacheIndex: this.currentLap.index
            }
        );
    }

    deleteCircle(): void {
        this.circles.splice(this.currentLap.index, 1);
        this.editMode = false;
        this.intervalAction.emit(
            {
                type: 'delete',
                cacheIndex: this.currentLap.index
            }
        );
    }

    edit(i, editNew) {
        this.editMode = true;
        this.currentLap = this.circles[i];
        this.currentLap.index = i;
        if (!editNew) {
            console.log('emit edit');
            this.intervalAction.emit(
                {
                    type: 'edit',
                    cacheIndex: i
                }
            );
        }
    }
}
