import { Injectable } from '@angular/core';
import { IHttpReq } from '../../../models/http-req';
import { HttpService } from '../../../services/http.service';

@Injectable()
export class FollowingListService {

    constructor(private httpService: HttpService) {
    }

    getFollowing(callback) {
        const getFollowingReq: IHttpReq = {
            url: '/api/user/subscribe/following',
            method: 'GET',
            body: {},
            failMessage: 'Can\'t show following'
        };
        this.httpService.sendRequest(getFollowingReq).then(data => {
            callback(data);
        });
    }

    unfollow(id) {
        const unfollowReq: IHttpReq = {
            url: '/api/user/subscribe/unfollow',
            method: 'POST',
            body: {
                'user_id': id
            },
            failMessage: 'Can\'t unfollow',
            successMessage: 'Unfollow'
        };
        this.httpService.sendRequest(unfollowReq).then(data => {
        });
    }

    follow(id: string) {
        const unfollowReq: IHttpReq = {
            url: '/api/user/subscribe/follow',
            method: 'POST',
            body: {
                'user_id': id
            },
            failMessage: 'Can\'t follow',
            successMessage: 'Follow again'
        };
        this.httpService.sendRequest(unfollowReq).then(data => {
        });
    }
}
