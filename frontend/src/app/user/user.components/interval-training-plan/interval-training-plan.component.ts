import { Component, OnInit } from '@angular/core';
import { ICircle, IIntervalExercise, IIntervalPlan } from '../../../models/interval-plan';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk';
import 'rxjs/add/observable/of';

@Component({
    selector: 'app-interval-training-plan',
    templateUrl: './interval-training-plan.component.html',
    styleUrls: ['./interval-training-plan.component.scss']
})
export class IntervalTrainingPlanComponent implements OnInit {
    displayedColumns = ['name', 'time'];
    dataSource: CircleDataSource;
    currentCircleNumber = 0;
    myInterval: IIntervalPlan;


    constructor() {
        this.myInterval = {
            circles: [
                {
                    exercises: [
                        {name: 'exercise', time: 0}
                    ],
                    restTime: 0
                }
            ]
        };
    }

    trackByCircles(index, station) {
        return index;
    }


    ngOnInit(): void {
        this.dataSource = new CircleDataSource(this.myInterval.circles[0].exercises);
    }

    onChange(i: number): void {
        this.dataSource = new CircleDataSource(this.myInterval.circles[i].exercises);
    }

    copyToNewCircle(): void {
        const currentCircle: ICircle = JSON.parse(JSON.stringify(this.myInterval.circles[this.currentCircleNumber]));
        this.myInterval.circles.push(currentCircle);
    }

    addEmptyCircle(): void {
        this.myInterval.circles.push({
            exercises: [{name: 'exercise', time: 0}],
            restTime: 0
        });
        console.log(this.myInterval);
    }

    addExercise(): void {
        this.myInterval.circles[this.currentCircleNumber].exercises.push({name: 'exercise', time: 0});
        this.dataSource = new CircleDataSource(this.myInterval.circles[this.currentCircleNumber].exercises);
    }

    deleteCircle(): void {
        if (this.myInterval.circles.length > 1) {
            this.myInterval.circles.splice(this.currentCircleNumber, 1);
        }
        if (this.currentCircleNumber !== 0) {
            this.currentCircleNumber--;
        }
        this.dataSource = new CircleDataSource(this.myInterval.circles[this.currentCircleNumber].exercises);
    }

    editExerciseName(event, row): void {
        row.name = event.target.value;
    }

    editExerciseTime(event, row): void {
        row.time = event.target.value;
    }

    getRestTime(): number {
        return this.myInterval.circles[this.currentCircleNumber].restTime;
    }

    getCircleTime(): number {
        // return this.myInterval.circles[this.currentCircleNumber].exercises.;
        return 0;
    }
}


export class CircleDataSource extends DataSource<IIntervalExercise> {
    constructor(private exercises: IIntervalExercise[]) {
        super();
    }

    connect(): Observable<IIntervalExercise[]> {
        return Observable.of(this.exercises);
    }

    disconnect() {
    }
}


