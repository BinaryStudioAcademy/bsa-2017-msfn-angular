import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';

@Injectable()
export class UserListService {
    constructor(private httpService: HttpService) {}

    getAllUsers(callback) {
        const request: IHttpReq = {
            url: '/api/user',
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request).then(data => {
            for (let i = 0; i < data.length; i++) {
                let role = 'usual';
                if (data[i].isCoach) {
                    role = 'coach';
                }
                if (data[i].isAdmin) {
                    role = 'admin';
                }
                data[i].role = role;
            }
            callback(data);
        });
    }

    getFollowers(callback) {
        const getFollowersReq: IHttpReq = {
            url: '/api/user/subscribe/followers',
            method: 'GET',
            body: {},
            failMessage: 'Can\'t show followers'
        };
        this.httpService.sendRequest(getFollowersReq).then(data => {
            callback(data);
        });
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

    unfollow(id, callback) {
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
            if(data){
                callback(null, data);
            }
        });
    }

    follow(id: string, callback) {
        const followReq: IHttpReq = {
            url: '/api/user/subscribe/follow',
            method: 'POST',
            body: {
                'user_id': id
            },
            failMessage: 'Can\'t follow',
            successMessage: 'Followed'
        };
        this.httpService.sendRequest(followReq).then(data => {
            if(data){
                callback(null, data);
            }
        });
    }
}
