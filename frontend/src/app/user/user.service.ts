import { EncryptService } from './../services/encrypt.service';
import { HttpService } from './../services/http.service';
import { Injectable } from '@angular/core';
import { IHttpReq } from '../models/http-req';
import { WindowObj } from '../services/window.service';

@Injectable()
export class UserService {
    private userId = (this._windowObj.data._injectedData as any).userId;
    public promiseFunc;


    constructor(private httpHandler: HttpService,
        private encryptService: EncryptService,
        private _windowObj: WindowObj) { }


    getBasicInfo(callback) {
        const request1: IHttpReq = {
            url: '/api/achievements',
            method: 'GET',
            body: {}
        };
        const promise1 = this.httpHandler.sendRequest(request1);

        const request2: IHttpReq = {
            url: '/api/measurement',
            method: 'GET',
            body: {}
        };
        const promise2 = this.httpHandler.sendRequest(request2);


        const request3: IHttpReq = {
            url: '/api/user/me',
            method: 'GET',
            body: {}
        };
        const promise3 = this.httpHandler.sendRequest(request3);
        this.promiseFunc = Promise.all([promise1, promise2, promise3]).then(result => {
            callback(...result);
        });
    }

    getUserAchievements(callback) {
        const request: IHttpReq = {
            url: '/api/achievements/user/',
            method: 'GET',
            body: {}
        };

        this.httpHandler.sendRequest(request).then(res => {
            callback(res);
        });
    }

    getUserOldStatus(callback) {
        const request: IHttpReq = {
            url: '/api/user/me/oldstatus',
            method: 'GET',
            body: {}
        };

        this.httpHandler.sendRequest(request).then(oldstatus => {
            callback(oldstatus);
        });

    }

    getFollowers(callback) {
        const getFollowersReq: IHttpReq = {
            url: '/api/user/subscribe/followers/' + this.userId,
            method: 'GET',
            body: {},
            failMessage: 'Can\'t show followers'
        };
        this.httpHandler.sendRequest(getFollowersReq).then(data => {
            callback(data.length);
        });

    }

    loadArticles(callback) {
        const request: IHttpReq = {
            url: `/api/articles/filter/${encodeURIComponent(this.encryptService.encrypt({ userId: this.userId }))}`,
            method: 'GET',
            body: {}
        };

        this.httpHandler.sendRequest(request)
            .then((result) => {
                if (result.length !== 0) {
                    result = result.map(item => {
                        if (item.userId) {
                            item.user = item.userId;
                        }
                        return item;
                    });
                }
                callback(result.length);
            });
    }

    getLaunchedTrainings(callback) {
        const sendData: IHttpReq = {
            url: '/api/launchedtraining/user/' + this.userId,
            method: 'GET',
            body: {},
        };

        this.httpHandler.sendRequest(sendData)
            .then(data => {
                callback(data);
            });
    }

    addUserAchievements(achievment) {
        achievment.achievement = achievment._id;
        achievment._id = undefined;
        achievment.finished = new Date();

        const request: IHttpReq = {
            url: '/api/achievements/user/',
            method: 'POST',
            body: achievment
        };

        this.httpHandler.sendRequest(request);
    }

    getTotalMeasures(trainings) {
        const total = {};
        const maxTraining = {};
        const sum = {};
        ['weight', 'distance'].forEach(measureName => {
            total[measureName] = 0;
            maxTraining[measureName] = 0;
            if (!(trainings instanceof Array)) {
                return total;
            }
            trainings.forEach(training => {
                sum[measureName] = 0;
                if (!(training.intervals && training.intervals instanceof Array)) {
                    return total;
                }
                training.intervals.forEach(interval => {
                    if (!(interval.exList && interval.exList instanceof Array)) {
                        return total;
                    }
                    interval.exList.forEach(exList => {
                        if (!(exList.sets && exList.sets instanceof Array)) {
                            return total;
                        }
                        if (exList.exercise.measure === measureName) {
                            exList.sets.forEach(set => {
                                total[measureName] += set.value * set.value2;
                                sum[measureName] += set.value * set.value2;
                            });
                        }
                    });
                });
                maxTraining[measureName] = maxTraining[measureName] > sum[measureName] ? maxTraining[measureName] : sum[measureName];
            });
        });
        return [total, maxTraining];
    }
}
