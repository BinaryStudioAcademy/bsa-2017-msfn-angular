import { Injectable } from '@angular/core';
import { IHttpReq } from '../../../models/http-req';
import { HttpService } from '../../../services/http.service';

@Injectable()
export class FollowersListService {

    constructor(private httpService: HttpService) {
    }

    getFollowers(callback) {
        const getFollowersReq: IHttpReq = {
            url: '/api/user/subscribe/followers',
            method: 'GET',
            body: {},
            failMessage: 'Can\'t show followers'
        };
        this.httpService.sendRequest(getFollowersReq).then(data => {
            console.log(data);
            callback(data);
        });
    }
}
