import { Component, OnInit } from '@angular/core';
import { ActiveTrainingService } from './active-training.service';

@Component({
    selector: 'app-active-training',
    templateUrl: 'active-training.component.html',
    styleUrls: ['active-training.component.scss'],
    providers: [
        ActiveTrainingService
    ]
})

export class ActiveTrainingComponent implements OnInit {
    loaded: boolean;
    finishTrain: boolean | string = false;
    reloadIntervals: boolean = false;
    userMeasures: any;
    trainingPlan: any;
    burnedCallories = 1445;

    // validation prop
    private editIntervalMode = false;
    private runned = false;


    constructor(
        private activeTrainingService: ActiveTrainingService
    ) {}

    ngOnInit() {
        this.activeTrainingService.getMeasures((data) => {
            this.userMeasures = data;
        });

        this.activeTrainingService.getPlans((plan) => {
            if (!plan) {
                this.loaded = false;
                return;
            }
            this.trainingPlan = plan;
            this.loaded = true;
        });
    }

    intervalAction(action) {
        if (action.type === 'save') {
            this.editIntervalMode = false;
            const data = action.data;
            data.exList = this.trainingPlan.exercisesList;
            this.trainingPlan.intervals[action.cacheIndex] = data;
            this.trainingPlan.exercisesList = [];
        } else if (action.type === 'delete') {
            this.editIntervalMode = false;
            this.trainingPlan.intervals.splice(action.cacheIndex, 1);
            this.trainingPlan.exercisesList = [];
        } else if (action.type === 'edit') {
            this.editIntervalMode = true;
            this.trainingPlan.exercisesList = this.trainingPlan.intervals[action.cacheIndex].exList;
        }
        this.reloadIntervals = !this.reloadIntervals;
    }
    showExercises(exList) {
        if (!this.editIntervalMode) {
            this.trainingPlan.exercisesList = exList;
        }
    }

    choosePlan() {
        this.activeTrainingService.getPlans((plan) => {
            if (plan === undefined) {
                return;
            }
            this.trainingPlan = plan;
            this.loaded = true;
        });
    }
    onStart() {
        this.activeTrainingService.addTraining(this.trainingPlan, (result) => {
            if (result) {
                this.trainingPlan._id = result;
            }
        });
        this.runned = true;
    }

    onFinish(timeData) {
        const data = {
            time: timeData,
            calories: this.burnedCallories,
        };
        this.activeTrainingService.showFinishDialog(data, this.trainingPlan, result => {
            if (result) {
                this.finishTrain = true;
            } else {
                this.finishTrain = 'continue';
            }
            setTimeout(() => { this.finishTrain = false; }, 1000);
        });
        this.runned = false;
    }

    onChangeList(updatedList) {
        this.trainingPlan.exercisesList = updatedList;
        if (this.trainingPlan._id) {
            this.activeTrainingService.updateTraining(this.trainingPlan);
        }
    }
}
