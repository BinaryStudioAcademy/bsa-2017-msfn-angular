import { Injectable } from '@angular/core';
import { IHttpReq } from '../../../models/http-req';
import { HttpService } from '../../../services/http.service';

@Injectable()
export class CoachService {

    constructor(private httpService: HttpService) {
    }

    getTrainingPlans(id: string, callback): void {
        const sendData: IHttpReq = {
            url: '/api/training-plan/user/' + id,
            method: 'GET',
            body: {},
        };

        this.httpService.sendRequest(sendData)
            .then(data => {
                callback(data);
            });
    }

    getArticles(id: string, callback): void {
        const sendData: IHttpReq = {
            url: '/api/articles/user/' + id,
            method: 'GET',
            body: {},
        };

        this.httpService.sendRequest(sendData)
            .then(data => {
                callback(data);
            });
    }
}
