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
        'Lose weight': () => {
            if (this.dataToProcess.weight.length === 0) {
                this.dataToProcess.weight = this.weightItems;
            }
            this.goalProgressService.getWeightLossProgress(this._weightItems);

        },
        'Increase weight': () => {
            if (this.dataToProcess.weight.length === 0) {
                this.dataToProcess.weight = this.weightItems;
            }
            this.goalProgressService.getWeightGainProgress(this._weightItems);
        },
        'Burn calories': () => {

        },
        'Run distance': () => {

        },
        'Do some count of exercises': () => {

        },
        'Do trainings count per week': () => {
            this.goalProgressService.getLaunchedTrainingData(this.userId, res => {
                console.log(res);
            });
        },
        'Eat calories per day': () => {

        },
        'Gain muscles': () => {

        },
        'Beat your records': () => {

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
        console.log('CHANGE');

        if (this.goalItems.length > 0 && !this.gotData.goal) {
            this.gotData.goal = true;
            console.log('GOALS INIT', this.goalItems);

            for (const goal of this.goalItems) {
                goal.startDateOutput = this.dateService.convertDateToIso(new Date(goal.startTime), true);
                goal.deadlineOutput = this.dateService.convertDateToIso(new Date(goal.deadline), true);

                if (!this.goalTypes.includes(goal.type)) {
                    this.goalTypes.push(goal.type);
                }

                this.processTypes();
            }
        }
    }

    processTypes() {
        for (const goalType of this.goalTypes) {
            this.getGoalData[goalType]();
        }
    }
}
