import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk';
import 'rxjs/add/observable/of';

@Component({
    selector: 'app-interval-training-plan',
    templateUrl: './interval-training-plan.component.html',
    styleUrls: ['./interval-training-plan.component.scss']
})
export class IntervalTrainingPlanComponent implements OnInit, OnChanges {

    @Input() intervalList: [any];
    @Output() intervalAction = new EventEmitter;
    displayedColumns = ['name', 'time'];
    dataSource: any;
    editMode: boolean;
    circles = [];

    currentLap = {
        lapTime: 1,
        warmTime: 0,
        name: '',
        count: '',
        index: 0
    };

    constructor() {}

    ngOnInit(): void {
        this.circles = this.intervalList;
    }

    ngOnChanges(changes): void {
        if (changes.intervalList) {
            this.circles = this.intervalList;
        }
    }

    addCircle() {
        if (this.circles.length) {
            this.circles.push({
                lapTime: 1,
                warmTime: 0,
                name: '',
                count: '',
            });
            this.edit(this.circles.length - 1, true);
        } else {
            this.editMode = true;
        }
    }

    saveCircle(): void {
        const data = {
            lapTime: this.currentLap.lapTime,
            warmTime: this.currentLap.warmTime,
            name: this.currentLap.name || 'Circle' + (this.currentLap.index + 1),
            count: this.currentLap.count || 1
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
            this.intervalAction.emit(
                {
                    type: 'edit',
                    cacheIndex: i
                }
            );
        }
    }
}
