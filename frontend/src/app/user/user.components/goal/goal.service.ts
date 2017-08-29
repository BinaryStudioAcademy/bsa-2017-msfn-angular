import { HttpService } from './../../../services/http.service';
import { IHttpReq } from './../../../models/http-req';
import { Injectable } from '@angular/core';

@Injectable()
export class GoalService {
    constructor(
        private httpService: HttpService
    ) { }


    getData(callback) {
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

    deleteGoal(goal, callback) {
        // request to server
    }
}
