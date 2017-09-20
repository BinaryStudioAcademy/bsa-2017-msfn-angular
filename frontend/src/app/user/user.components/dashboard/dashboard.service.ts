import { Injectable } from '@angular/core';
import { IHttpReq } from '../../../models/http-req';
import { HttpService } from '../../../services/http.service';

@Injectable()
export class DashboardService {

    constructor(private httpService: HttpService) {
    }

    getGoalData(callback) {
        const sendData: IHttpReq = {
            url: '/api/user-goal/',
            method: 'GET',
            body: {},
        };

        this.httpService.sendRequest(sendData)
            .then(data => {
                callback(data);
            });
    }

    getUser(callback) {
        const request: IHttpReq = {
            url: '/api/user/me',
            method: 'GET',
            body: ''
        };
        this.httpService.sendRequest(request).then(res => {
            callback(res);
        });
    }

    getFoodPlanData(callback): void {
        const request: IHttpReq = {
            url: '/api/launchedfoodplan/current',
            method: 'GET',
            body: {}
        };

        this.httpService.sendRequest(request)
            .then(data => {
                callback(data);
            });
    }
}
