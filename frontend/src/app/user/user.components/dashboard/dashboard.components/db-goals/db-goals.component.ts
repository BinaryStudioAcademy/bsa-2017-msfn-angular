import { Component, OnInit } from '@angular/core';
import { GoalService } from '../../../goal/goal.service';
import { DateService } from '../../../../../services/date.service';

@Component({
    selector: 'app-db-goals',
    templateUrl: './db-goals.component.html',
    styleUrls: [
        './db-goals.component.scss',
        '../../dashboard.component.scss'
    ],
    providers: [
        GoalService,
        DateService
    ]
})
export class DbGoalsComponent implements OnInit {

    constructor(private goalService: GoalService,
                private dateService: DateService) { }

    title = 'Goals';
    goals = [];

    ngOnInit() {
        this.getItems();
    }

    getItems(): void {
        this.goalService.getData(res => {
            if (res[0].hasOwnProperty('value')) {
                this.goals = res;
                for (const goal of this.goals) {
                    goal.startDateOutput = this.dateService.convertDateToIso(new Date(goal.startTime), true);
                    goal.deadlineOutput = this.dateService.convertDateToIso(new Date(goal.deadline), true);
                }
            } else {
                this.goals = [];
            }
        });
    }
}
