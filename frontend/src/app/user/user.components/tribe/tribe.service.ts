import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';

@Injectable()
export class TribeService {

    constructor(
        private httpService: HttpService
    ) { }

    getUserById(id, callback) {
        const request: IHttpReq = {
            url: '/api/user/' + id,
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request)
            .then(data => {
                callback(data);
            });
    }

    getTribe(id, callback) {
        const request: IHttpReq = {
            url: `api/tribe/${id}`,
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request)
            .then( (data) => {
                callback(data);
            });
    }

    getPostsByTribe(id, callback) {
        const request: IHttpReq = {
            url: `/api/tribe/${id}/posts`,
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request)
            .then( (data) => {
                callback(data);
            });
    }

    commentPost(tribeId, postId, userId, text, callback) {
        const request: IHttpReq = {
            url: `/api/tribe/${tribeId}/post/${postId}`,
            method: 'PUT',
            body: {
                comments: [
                    {
                        author: userId,
                        text: text
                    }
                ]
            }
        };
        this.httpService.sendRequest(request)
            .then( (data) => { callback(data); });
    }

}
