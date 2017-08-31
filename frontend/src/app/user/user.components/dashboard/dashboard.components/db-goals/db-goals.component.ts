import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DateService } from '../../../../../services/date.service';
import { GoalProgressService } from '../../../../../services/goal-progress.service';

@Component({
    selector: 'app-db-goals',
    templateUrl: './db-goals.component.html',
    styleUrls: [
        './db-goals.component.scss',
        '../../dashboard.component.scss'
    ],
    providers: [
        GoalProgressService,
        DateService
    ]
})
export class DbGoalsComponent implements OnInit, OnChanges {

    constructor(private goalProgressService: GoalProgressService,
                private dateService: DateService) { }

    title = 'Goals';
    @Input() goalItems: any[];
    @Input() weightItems: any[];

    gotData = false;

    ngOnInit() { }

    ngOnChanges() {
        console.log('CHANGE');

        if (this.goalItems.length > 0 && !this.gotData) {
            this.gotData = true;
            console.log('GOALS INIT', this.goalItems);

            for (const goal of this.goalItems) {
                goal.startDateOutput = this.dateService.convertDateToIso(new Date(goal.startTime), true);
                goal.deadlineOutput = this.dateService.convertDateToIso(new Date(goal.deadline), true);
            }
        }
    }

    getItems(): void {
        this.goalProgressService.getGoalData(res => {
            if (res[0].hasOwnProperty('value')) {
                this.goalItems = res;
                for (const goal of this.goalItems) {
                    goal.startDateOutput = this.dateService.convertDateToIso(new Date(goal.startTime), true);
                    goal.deadlineOutput = this.dateService.convertDateToIso(new Date(goal.deadline), true);
                }
            } else {
                this.goalItems = [];
            }
        });
    }
}
