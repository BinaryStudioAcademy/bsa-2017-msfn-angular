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
    private achievementMeasures = {
        distance: 1000,
        weight: 1
    };
    private total = {};
    private maxTrainings = {};
    private settings;
    private countFollowers: number;
    private countArticles: number;
    private countLaunchedTraining: number;
    private comboCount: number;
    private registrationDate: string;

    constructor(
        private dialog: MdDialog,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.userService.getBasicInfo((achieves, measures, settings) => {
            this.achievements = achieves;
            this.settings = settings;
            ['distance', 'weight'].forEach(measureName => {
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
            this.userService.getFollowers(followers => {
                this.countFollowers = followers;
                this.checkFollowerAchievement();
            });
            this.userService.loadArticles(articles => {
                this.countArticles = articles;
                this.checkArticlesAchievement();
            });
            this.userService.getLaunchedTrainings(trainings => {
                this.countLaunchedTraining = trainings.length;
                this.checkTrainAchievement();
                const result = this.userService.getTotalMeasures(trainings);
                this.total = result[0];
                this.maxTrainings = result[1];
                this.checkTrainingMaxAchievement('distance');
            });
            this.userService.getUserOldStatus((data) => {
                this.comboCount = data.comboCount;
                this.registrationDate = data.registrationDate;
                this.checkOldStatusAchievement();
            });
        });
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

    // checkComboDaysAchievement() {
    //     const resAch = [];
    //     this.achievements.forEach(element => {
    //         if (element.measureName === 'combodays' && this.comboCount >= element.value) {
    //             resAch.push(element);
    //         }
    //     });
    //     this.getUnreceivedArray(resAch);
    // }

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


    checkTrainingMaxAchievement(measureName) {
        const resAch = [];
        this.achievements.forEach(element => {
            if (element.measureName === measureName && (this.maxTrainings[measureName] * this.achievementMeasures[measureName]
            >= element.value * this.measures[measureName])) {
                resAch.push(element);
            }
        });
        this.getUnreceivedArray(resAch);
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
        if (this.userService.promiseFunc) {
            this.userService.promiseFunc.unsubscribe();
        }

    }

}
