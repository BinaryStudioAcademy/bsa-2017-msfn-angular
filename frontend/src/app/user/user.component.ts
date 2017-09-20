import { UserService } from './user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EncryptService } from '../services/encrypt.service';
import { HttpService } from '../services/http.service';
import { IHttpReq } from '../models/http-req';
import { WindowObj } from '../services/window.service';
import { MdDialog } from '@angular/material';
import { AchievementReceivedDialogComponent } from './user.components/achievement-received-dialog/achievement-received-dialog.component';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    providers: [UserService]
})
export class UserComponent implements OnInit, OnDestroy {
    private achievements: Array<any>;
    private measures = {};
    private goals = [];
    private achievementMeasures = {
        distance: 1000,
        weight: 1
    };
    private total = {};
    private maxTrainings = {};
    private settings;
    private weights;
    private countFollowers: number;
    private countArticles: number;
    private countLaunchedTraining: number;
    private comboCount: number;
    private registrationDate: string;
    private launchTrain: Array<any>;
    private countWeekTrain: number;

    constructor(
        private dialog: MdDialog,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.userService.getBasicInfo((achieves, measures, settings, weights, goals) => {
            this.achievements = achieves;
            this.settings = settings;
            this.weights = weights;
            this.goals = goals;
            this.userService.getCategories(categories => {
                categories.forEach(category => {
                    this.goals.forEach(goal => {
                        // tslint:disable-next-line:triple-equals
                        if (category._id == goal.category) {
                            goal.tmpCategory = category.category;
                        }
                    });
                });
                console.log(this.goals);
                ['distance', 'weight'].forEach(measureName => {
                    measures.forEach(element => {
                        if (element.measureName === measureName) {
                            element.measureUnits.forEach(unit => {
                                // console.log(unit.unitName, this.settings);
                                if (unit.unitName === this.settings[measureName]) {
                                    this.measures[measureName] = unit.conversionFactor;
                                }
                            });
                        }
                    });
                });
                this.userService.getFollowers(followers => {
                    this.countFollowers = followers;
                    this.checkFollowerAchievement();
                });
                this.userService.loadArticles(articles => {
                    this.countArticles = articles;
                    this.checkArticlesAchievement();
                });
                this.userService.getLaunchedTrainings(trainings => {
                    this.launchTrain = trainings;
                    this.countLaunchedTraining = trainings.length;
                    this.checkTrainAchievement();
                    const result = this.userService.getTotalMeasures(trainings);
                    this.total = result[0];
                    this.maxTrainings = result[1];
                    this.checkTrainingsAchievement('distance', 'distance', this.maxTrainings);
                    this.checkTrainingsAchievement('weight', 'trainweight', this.maxTrainings);
                    this.checkTrainingsAchievement('distance', 'totaldistance', this.total);
                    this.checkTrainingsAchievement('weight', 'totalweight', this.total);
                    this.checkLosingWeight();
                    this.checkWeightGoal();
                    this.checkGoal('followers', this.countFollowers);
                    this.checkGoal('launchedtrainings', this.countLaunchedTraining);
                    this.checkGoal('totaldistance', this.total['distance']);
                    this.checkGoal('totalweight', this.total['weight']);
                });
                if (new Date().getDay() === 1) {
                    this.userService.getWeekTrainCount(count => {
                        this.countWeekTrain = count;
                        this.checkPerfectWeek();
                    });
                }
                this.userService.getUserOldStatus((data) => {
                    this.comboCount = data.comboCount;
                    this.registrationDate = data.registrationDate;
                    this.checkOldStatusAchievement();
                    this.checkComboDaysAchievement();
                    this.checkAchievementLength();

                    this.checkGoal('combo', this.comboCount);
                });
            });
        });
    }

    swipe(sidebar, swypetype) {
        if (swypetype === 'swiperight') {
            sidebar.classList.remove('hide');
        } else if (swypetype === 'swipeleft') {
            sidebar.classList.add('hide');
        }
    }
    checkLosingWeight() {
        const resAch = [];
        this.achievements.forEach(element => {
            if (element.measureName === 'loseweight') {
                if (this.weights.weightControl.length > 0) {
                    this.weights.weightControl.some(weightControl => {
                        if (this.weights.weight - weightControl.weight >= element.value) {
                            resAch.push(element);
                            return true;
                        } else {
                            return false;
                        }
                    });
                }
            }
        });
        this.getUnreceivedArray(resAch);
    }




    checkTrainAchievement() {
        const resAch = [];
        this.achievements.forEach(element => {
            if (element.measureName === 'train' && this.countLaunchedTraining >= element.value) {
                resAch.push(element);
            }
        });
        this.getUnreceivedArray(resAch);
    }

    checkFollowerAchievement() {
        const resAch = [];
        this.achievements.forEach(element => {
            if (element.measureName === 'follower' && this.countFollowers >= element.value) {
                resAch.push(element);
            }
        });
        this.getUnreceivedArray(resAch);
    }

    checkAchievementLength() {
        const resAch = [];
        this.userService.getUserAchievements((userAchievments) => {
            this.achievements.forEach(element => {
                if (element.measureName === 'achieivcount' && userAchievments.length / (this.achievements.length - 1) >= element.value) {
                    resAch.push(element);
                }
            });
        });
        this.getUnreceivedArray(resAch);
    }

    checkComboDaysAchievement() {
        const resAch = [];
        this.achievements.forEach(element => {
            if (element.measureName === 'combodays' && this.comboCount >= element.value) {
                resAch.push(element);
            }
        });
        this.getUnreceivedArray(resAch);
    }

    checkOldStatusAchievement() {
        const resAch = [];
        this.achievements.forEach(element => {
            // tslint:disable-next-line:max-line-length
            if (element.measureName === 'day' && Math.floor((new Date().valueOf() - new Date(this.registrationDate).valueOf()) / (24 * 60 * 60 * 1000)) >= element.value) {
                resAch.push(element);
            }
        });
        this.getUnreceivedArray(resAch);
    }

    checkArticlesAchievement() {
        const resAch = [];
        this.achievements.forEach(element => {
            if (element.measureName === 'articles' && this.countArticles >= element.value) {
                resAch.push(element);
            }
        });
        this.getUnreceivedArray(resAch);
    }


    checkTrainingsAchievement(measureName, achievementName, array) {
        const resAch = [];
        this.achievements.forEach(element => {
            // if (achievementName === element.measureName) {
            //     console.log(array[measureName] * this.achievementMeasures[measureName],
            //         element.value * this.measures[measureName], achievementName);
            // }
            if (element.measureName === achievementName && (array[measureName] * this.achievementMeasures[measureName]
                >= element.value * this.measures[measureName])) {
                resAch.push(element);
            }
        });
        this.getUnreceivedArray(resAch);
    }

    checkPerfectWeek() {
        let counter = 0;
        this.launchTrain.forEach(element => {
            if ((new Date().valueOf() - new Date(element.startDate).valueOf() < (1000 * 60 * 60 * 24 * 7)) && (element.planned)) {
                ++counter;
            }
        });
        if (this.countWeekTrain === counter) {
            const resAch = [];
            this.achievements.forEach(element => {
                if (element.measureName === 'perfectweek') {
                    resAch.push(element);
                }
            });
            this.getUnreceivedArray(resAch);
        }
    }

    getUnreceivedArray(resAch) {
        if (resAch.length) {
            this.userService.getUserAchievements((userAchievments) => {
                const resArr = this.diffArr(userAchievments, resAch);
                resArr.forEach(element => {
                    this.dialog.open(AchievementReceivedDialogComponent, { data: element })
                        .afterClosed().subscribe(() => {
                            this.userService.addUserAchievements(element);
                        });
                });
            });
        }
    }

    diffArr(userArr, achArr) {
        if (!userArr) {
            return achArr;
        }
        achArr.forEach(ach => {
            ach.achieved = userArr.some(userAch => {
                // tslint:disable-next-line:triple-equals
                if (ach._id == userAch.achievement) {
                    return true;
                } else {
                    return false;
                }
            });
        });
        achArr = achArr.filter(elem => {
            return !elem.achieved;
        });
        return achArr;
    }

    ngOnDestroy() {
        if (this.userService.promiseFunc.unsubscribe) {
            this.userService.promiseFunc.unsubscribe();
        }
    }


    checkGoal(category, value) {
        if (!this.goals) {
            return;
        }
        const what = this.goals.filter(elem => {
            return elem.tmpCategory === category;
        });
        if (!what) {
            return;
        }
        what.forEach(element => {
            this.userService.updateCurrentValue({
                _id: element._id,
                value: value
            }, () => { });
        });
    }


    checkWeightGoal() {
        if (!this.goals) {
            return;
        }
        const what = this.goals.filter(elem => {
            return elem.tmpCategory === 'changeweight';
        });
        if (!what) {
            return;
        }
        let weight;
        if (this.weights.weightControl.length > 0) {
            weight = this.weights.weightControl[this.weights.weightControl.length - 1].weight;
        } else {
            weight = this.weights.weight;
        }
        what.forEach(element => {
            this.userService.updateCurrentValue({
                _id: element._id,
                value: weight
            }, () => { });
        });
    }

}
