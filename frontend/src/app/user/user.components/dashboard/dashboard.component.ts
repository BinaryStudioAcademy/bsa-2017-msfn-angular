import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { GoalProgressService } from '../../../services/goal-progress.service';
import { WeightControlService } from '../weight-control/weight-control.service';
import { DateService } from '../../../services/date.service';
import { GoalService } from '../goal/goal.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [
        DashboardService,
        GoalService,
        WeightControlService,
        GoalProgressService,
        DateService
    ]
})
export class DashboardComponent implements OnInit {

    constructor(private dashboardService: DashboardService,
                private goalService: GoalService,
                private weightControlService: WeightControlService,
                private goalProgressService: GoalProgressService,
                private dateService: DateService) { }

    dragOptions = {
        animation: 500
    };

    goalItems = [];
    weightItems = [];

    ngOnInit() {
        this.getGoalItems();
        this.getWeightItems();
    }

    getGoalItems(): void {
        this.goalService.getData(res => {
            if (res[0].hasOwnProperty('value')) {
                this.goalItems = res;
            } else {
                this.goalItems = [];
            }
        });
    }

    getWeightItems(): void {
        this.weightControlService.getWeightItems(res => {
            if (res[0].hasOwnProperty('weight')) {
                this.weightItems = res;
            } else {
                this.weightItems = [];
            }
        });
    }
}
