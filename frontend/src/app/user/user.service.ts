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
        this.getAchievemnts((data) => {
            this.getMeasures((measure, settings) => {
                callback(data, measure, settings);
            });
        });
    }

    getAchievemnts(callback) {
        const request: IHttpReq = {
            url: '/api/achievements',
            method: 'GET',
            body: {}
        };

        this.httpHandler.sendRequest(request).then(res => {
            callback(res);
        });
    }

    getMeasures(callback) {
        const request: IHttpReq = {
            url: '/api/measurement',
            method: 'GET',
            body: {}
        };

        this.httpHandler.sendRequest(request).then(res => {
            this.getUserSettings((settings) => {
                callback(res, settings);
            });
        });
    }

    getUserSettings(callback) {
        const request: IHttpReq = {
            url: '/api/user/me/measures',
            method: 'GET',
            body: {}
        };

        this.httpHandler.sendRequest(request).then(settings => {
            callback(settings);
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
