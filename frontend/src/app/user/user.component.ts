import {Component, OnInit} from '@angular/core';
import { EncryptService } from '../services/encrypt.service';
import { HttpService } from '../services/http.service';
import { IHttpReq } from '../models/http-req';
import { WindowObj } from '../services/window.service';
import { MdDialog } from '@angular/material';
import { AchievementReceivedDialogComponent } from './user.components/achievement-received-dialog/achievement-received-dialog.component';

@Component ({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    private userId = (this._windowObj.data._injectedData as any).userId;
    private achievements: Array<any>;
    private countFollowers: Number;
    private countArticles: Number;
    private countLaunchedTraining: Number;

    constructor(private httpHandler: HttpService,
        private _windowObj: WindowObj,
        private encryptService: EncryptService,
        private dialog: MdDialog
    ) {}

    ngOnInit() {
        this.getAchievemnts();
        this.getFollowers();
        this.loadArticles();
        this.getLaunchedTrainings();
        setTimeout(() => this.checkAchievement(), 5000);
    }

    getFollowers() {
        const getFollowersReq: IHttpReq = {
            url: '/api/user/subscribe/followers/' + this.userId,
            method: 'GET',
            body: {},
            failMessage: 'Can\'t show followers'
        };
        this.httpHandler.sendRequest(getFollowersReq).then(data => {
            this.countFollowers = data.length;
        });
    }

    loadArticles() {
        const request: IHttpReq = {
            url: `/api/articles/filter/${encodeURIComponent(this.encryptService.encrypt({userId: this.userId}))}`,
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
                this.countArticles = result.length;
            });
    }

    getLaunchedTrainings() {
        const sendData: IHttpReq = {
            url: '/api/launchedtraining/user/' + this.userId,
            method: 'GET',
            body: {},
        };

        this.httpHandler.sendRequest(sendData)
            .then(data => {
                this.countLaunchedTraining = data.length;
        });
    }

    getAchievemnts() {
        const request: IHttpReq = {
            url: '/api/achievements',
            method: 'GET',
            body: {}
        };

        this.httpHandler.sendRequest(request).then(res => {
            this.achievements = res;
        });
    }

    getUserAchievemnts(callback) {
        const request: IHttpReq = {
            url: '/api/achievements/user/' + this.userId,
            method: 'GET',
            body: {}
        };

        this.httpHandler.sendRequest(request).then(res => {
            callback(res);
        });
    }

    checkAchievement() {
        const resAch = [];
        this.achievements.forEach(element => {
            if (element.measureName === 'train' && this.countLaunchedTraining >= element.value) {
                if (resAch[resAch.length - 1] && resAch[resAch.length - 1].measureName === 'train') {
                    resAch[resAch.length - 1] = (resAch[resAch.length - 1].value > element.value) ? resAch[resAch.length - 1] : element;
                } else {
                    resAch.push(element);
                }
            } else if (element.measureName === 'follower' && this.countFollowers >= element.value) {
                if (resAch[resAch.length - 1] && resAch[resAch.length - 1].measureName === 'follower') {
                    resAch[resAch.length - 1] = (resAch[resAch.length - 1].value > element.value) ? resAch[resAch.length - 1] : element;
                } else {
                    resAch.push(element);
                }
            } else if (element.measureName === 'articles' && this.countArticles >= element.value) {
                if (resAch[resAch.length - 1] && resAch[resAch.length - 1].measureName === 'articles') {
                    resAch[resAch.length - 1] = (resAch[resAch.length - 1].value > element.value) ? resAch[resAch.length - 1] : element;
                } else {
                    resAch.push(element);
                }
            }
        });
        if (resAch.length) {
            this.getUserAchievemnts((userAchievments) => {
                console.log('userAchievments');
                console.log(userAchievments);
                // here must be func of filter two arrays to unique
                resAch.forEach(element => {
                    this.dialog.open(AchievementReceivedDialogComponent, { data: element });
                });
                // here must be func of send request for add achievements to user
            });
        }
    }
}
