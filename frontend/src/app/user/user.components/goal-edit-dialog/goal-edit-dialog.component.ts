import { UserService } from './../../user.service';
import { GoalEditDialogService } from './goal-edit-dialog.service';
import { MD_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
    selector: 'app-goal-edit-dialog',
    templateUrl: './goal-edit-dialog.component.html',
    styleUrls: ['./goal-edit-dialog.component.scss'],
    providers: [GoalEditDialogService, UserService]
})
export class GoalEditDialogComponent implements OnInit {
    minDate: Date;
    types = [];
    loaded = false;
    id: string;
    name: string;
    selectedType: string;
    deadline: Date;
    endValue: number;
    startValue;
    validValue = false;
    settings = {};
    weights = {
        weightControl: null,
        weight: null,
    };
    goalType = null;
    measures = {};
    total = {};
    minValue = {
        combo: 1,
        changeweight: 35,
        followers: 1,
        totalweight: 100,
        totaldistance: 1,
        launchedtrainings: 1,
    };
    maxValue = {
        combo: 36500,
        changeweight: 160,
        followers: 100000,
        totalweight: 10000000000,
        totaldistance: 100000000,
        launchedtrainings: 10000,
    };
    constructor(
        @Inject(MD_DIALOG_DATA) public data: any,
        private goalEditDialogService: GoalEditDialogService,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.id = this.data.item._id;
        this.minDate = new Date();

        this.userService.getBasicInfo((achieves, measures, settings, weights, goals) => {
            this.settings = settings;
            this.weights = weights;
            ['distance', 'weight'].forEach(measureName => {
                console.log(measures);
                measures.forEach(element => {
                    if (element.measureName === measureName) {
                        element.measureUnits.forEach(unit => {
                            if (unit.unitName === this.settings[measureName]) {
                                this.measures[measureName] = unit.conversionFactor;
                            }
                        });
                    }
                });
            });
            this.loaded = true;
        });


        this.goalEditDialogService.getGoals((response) => {
            this.types = response;
            console.log(this.id);
            if (this.id === '-1') {
                this.deadline = new Date();
                this.deadline.setFullYear(this.deadline.getFullYear() + 1);
                this.selectedType = this.types[0]._id;
                this.endValue = 0;
                this.getStartValue();
            } else {
                this.deadline = new Date(this.data.item.deadline);
                this.selectedType = this.data.item.category;
                this.endValue = this.data.item.endValue;
                this.getStartValue();
            }
            this.checkValue();
        });
    }

    addUserGoal(body) {
        this.goalEditDialogService.addUserGoal(body, () => {});
    }


    updateUserGoal(body) {
        this.goalEditDialogService.updateUserGoal(body, () => {});
    }

    addUpdateUserGoal(data, event) {
        if (this.id === '-1') {
            this.addUserGoal(data);
        } else {
            data._id = this.id;
            this.updateUserGoal(data);
        }
    }

    checkValue() {
        if (!this.goalType) {
            return false;
        }
        console.log(this.goalType, this.minValue[this.goalType], this.maxValue[this.goalType]);
        this.validValue = (this.endValue >= this.minValue[this.goalType] && this.endValue !== this.startValue &&
         this.endValue <= this.maxValue[this.goalType]) ? true : false;
    }

    getStartValue() {
        this.userService.addGoalCategory(this.selectedType, (goal) => {
        this.name = goal.name;
        this.goalType = goal.category;
        if (goal.category === 'totalweight' || goal.category === 'totaldistance') {
            this.userService.getLaunchedTrainings(trainings => {
                const result = this.userService.getTotalMeasures(trainings);
                this.total = result[0];
                if (goal.category === 'totaldistance') {
                    this.startValue = this.total['distance'];
                } else {
                    this.startValue = this.total['weight'];
                }
            });
        }

        if (goal.category === 'changeweight') {
            if (this.weights.weightControl.length > 0) {
                this.startValue = this.weights.weightControl[this.weights.weightControl.length - 1].weight;
            } else {
                this.startValue = this.weights.weight;
            }
        }

        if (goal.category === 'combo') {
            this.userService.getUserOldStatus(oldStatus => {
                this.startValue = oldStatus.comboCount;
            });
        }

        if (goal.category === 'followers') {
            this.userService.getFollowers(followers => {
                this.startValue = followers;
            });
        }

        if (goal.category === 'launchedtrainings') {
            this.userService.getLaunchedTrainings(trainings => {
                this.startValue = trainings.length;
            });
        }

        });
    }

}
