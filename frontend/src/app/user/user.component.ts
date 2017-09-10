import {Component, OnInit} from '@angular/core';
import { EncryptService } from '../services/encrypt.service';
import { HttpService } from '../services/http.service';
import { IHttpReq } from '../models/http-req';
import { WindowObj } from '../services/window.service';

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

    constructor(private httpHandler: HttpService,
        private _windowObj: WindowObj,
        private encryptService: EncryptService,
    ) {}

    ngOnInit() {
        this.getFollowers();
        this.getAchievemnts();
        this.loadArticles();
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
}
