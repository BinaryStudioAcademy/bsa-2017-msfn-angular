import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DateService } from '../../../../../services/date.service';
import { GoalProgressService } from '../../../../../services/goal-progress.service';
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
export class DbGoalsComponent implements OnInit, OnChanges {

    constructor(private goalProgressService: GoalProgressService,
                private dateService: DateService,
                private window: WindowObj) { }

    userId = (this.window.data._injectedData as any).userId;
    title = 'Goals';
    goalTypes: string[] = [];

    dataToProcess = {
        weight: [],
        activity: []
    };

    getGoalData = {
        'Lose weight': (goal) => {
            if (this.dataToProcess.weight.length === 0) {
                this.dataToProcess.weight = this.weightItems;
            }

            goal.progress = this.goalProgressService.getWeightProgress(
                this.dataToProcess.weight, goal);

            const diff = goal.progress.start - goal.progress.goal,
                currentDiff = goal.progress.start - goal.progress.current;
            goal.progress.value = currentDiff / diff * 100;
        },

        'Increase weight': (goal) => {
            if (this.dataToProcess.weight.length === 0) {
                this.dataToProcess.weight = this.weightItems;
            }

            goal.progress = this.goalProgressService.getWeightProgress(
                this.dataToProcess.weight, goal);

            const diff = goal.progress.goal - goal.progress.start,
                currentDiff = goal.progress.current - goal.progress.start;
            goal.progress.value = currentDiff / diff * 100;
        },

        'Burn calories': (goal) => {

        },
        'Run distance': (goal) => {

        },
        'Do some count of exercises': (goal) => {

        },
        'Do trainings count per week': (goal) => {
            this.goalProgressService.getLaunchedTrainingData(this.userId, res => {
            });
        },
        'Eat calories per day': (goal) => {

        },
        'Gain muscles': (goal) => {

        },
        'Beat your records': (goal) => {

        }
    };

    @Input() goalItems: any[];
    private _weightItems: any[];

    @Input()
    set weightItems(weightItems: any[]) {
        this._weightItems = weightItems || [];
    }

    get weightItems(): any[] {
        return this._weightItems;
    }

    gotData = {
        goal: false,
        weightControl: false
    };

    ngOnInit() { }

    ngOnChanges() {
        if (this.goalItems.length > 0 && !this.gotData.goal) {
            this.gotData.goal = true;
            console.log('GOALS INIT', this.goalItems);

            for (const goal of this.goalItems) {
                goal.startDateOutput = this.dateService.convertDateToIso(
                    new Date(goal.startTime), true);
                goal.deadlineOutput = this.dateService.convertDateToIso(
                    new Date(goal.deadline), true);

                if (!this.goalTypes.includes(goal.type)) {
                    this.goalTypes.push(goal.type);
                    setTimeout(() => this.getGoalData[goal.type](goal));
                }
            }
        }
    }
}
