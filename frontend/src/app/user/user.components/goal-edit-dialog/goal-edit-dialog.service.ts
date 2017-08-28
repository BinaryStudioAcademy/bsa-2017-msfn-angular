import { IHttpReq } from './../../../models/http-req';
import { HttpService } from './../../../services/http.service';
import { Injectable } from '@angular/core';

@Injectable()
export class GoalEditDialogService {

    constructor(
        private httpService: HttpService
    ) { }

    getGoals(callback) {
        const sendData: IHttpReq = {
            url: '/api/goal/',
            method: 'GET',
            body: {},
        };

        this.httpService.sendRequest(sendData)
            .then(data => {
                callback(data);
        });
    }

    addUserGoal(body, callback) {
       const sendData: IHttpReq = {
            url: '/api/user-goal/',
            method: 'POST',
            body: body,
        };

        this.httpService.sendRequest(sendData)
            .then(data => {
                callback(data);
        });
    }

    updateUserGoal(body, callback) {
       const sendData: IHttpReq = {
            url: '/api/user-goal/',
            method: 'PUT',
            body: body,
        };
        console.log(body);
        this.httpService.sendRequest(sendData)
            .then(data => {
                console.log(data);
                callback(data);
        });
    }

}
