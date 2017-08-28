import { Component, Input, Output, OnInit } from '@angular/core';
import { ICircle } from '../../../models/interval-plan';
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
    displayedColumns = ['name', 'time'];
    dataSource: any;
    currentCircleNumber: number = 0;
    circles: [ICircle] = [{
        lapTime: 0,
        warmTime: 0,
    }];

    currentLap = {
        lapTime: 0,
        warmTime: 0,
    };

    constructor() {}

    ngOnInit(): void {
        console.log(this.intervalList);
    }

    onChange(i: number): void {
        this.currentLap = this.circles[i];
    }

    saveCircle(): void {
        const data = {
            lapTime: this.currentLap.lapTime,
            warmTime: this.currentLap.warmTime
        };
        if (!this.circles[0].lapTime) {
            this.circles[0] = data;
        } else {
            this.circles.push(data);
        }
        console.log(this.circles);
    }

    copyToNewCircle(): void {
        const currentCircle: ICircle = JSON.parse(JSON.stringify(this.circles[this.currentCircleNumber]));
        this.circles.push(currentCircle);
    }

    deleteCircle(): void {
        if (this.circles.length > 1) {
            this.circles.splice(this.currentCircleNumber, 1);
        }
        if (this.currentCircleNumber !== 0) {
            this.currentCircleNumber--;
        }
    }

    getRestTime(): number {
        return this.circles[this.currentCircleNumber].warmTime;
    }

    getCircleTime(): number {
        return this.circles[this.currentCircleNumber].lapTime;
    }
}
