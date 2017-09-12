import { EncryptService } from './../services/encrypt.service';
import { HttpService } from './../services/http.service';
import { Injectable } from '@angular/core';
import { IHttpReq } from '../models/http-req';
import { WindowObj } from '../services/window.service';

@Injectable()
export class UserService {
    private userId = (this._windowObj.data._injectedData as any).userId;


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
            url: '/api/user/me/measures',
            method: 'GET',
            body: {}
        };
        const promise3 = this.httpHandler.sendRequest(request3);
        Promise.all([promise1, promise2, promise3]).then(result => {
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
        console.log(trainings);
    }
}
