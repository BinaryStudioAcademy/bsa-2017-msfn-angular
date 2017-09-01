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
}
