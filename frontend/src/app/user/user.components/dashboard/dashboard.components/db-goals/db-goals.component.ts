import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DateService } from '../../../../../services/date.service';
import { GoalProgressService } from '../../../../services/goal-progress.service';
import { WindowObj } from '../../../../../services/window.service';

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
export class DbGoalsComponent implements OnInit {

    constructor(private goalProgressService: GoalProgressService) { }

    title = 'Goals';
    goalItems = [];

    ngOnInit() {
        this.goalProgressService.getUserGoals(goals => {
            if (goals.length === 1 && !goals[0]._id) {
                goals = [];
            } else {
                goals.forEach(e => {
                    e.progress = Math.round(Math.min(1, Math.max(0, (e.currentValue - e.startValue) /
                        (e.endValue - e.startValue))) * 100);
                });
            }
            console.log(goals, 'I');
            this.goalItems = goals;
        });
    }
}
