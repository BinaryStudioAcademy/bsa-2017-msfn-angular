import { IHttpReq } from '../../../models/http-req';
import { HttpService } from '../../../services/http.service';
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
        Object.assign(body, {
            startTime: new Date()
        }
        );
        this.setValues(body, (finishedBody) => {/*
            const sendData: IHttpReq = {
                url: '/api/user-goal/',
                method: 'POST',
                body: finishedBody,
            };
            this.httpService.sendRequest(sendData)
                .then(data => {
                    callback(data);
                });*/
        });
    }


    updateUserGoal(body, callback) {
        this.setValues(body, (finishedBody) => {/*
            const sendData: IHttpReq = {
                url: '/api/user-goal/',
                method: 'PUT',
                body: finishedBody,
            };
            this.httpService.sendRequest(sendData)
                .then(data => {
                    callback(data);
                });*/
        });
    }


    setValues(body, callback) {
        console.log(body);
        const sendData: IHttpReq = {
                url: '/api/goal/' + body.category,
                method: 'GET',
                body: body,
            };
            this.httpService.sendRequest(sendData)
                .then(data => {
                    console.log(data);
                    if (data === 'weighttotal') {
                        console.log('AAA');
                    }
                });
    }



    checkData(selectedType, deadline, value) {
        console.log(deadline);
        let isCorrectType = true, isCorrectDeadline = true, isCorrectValue = true;
        if (!selectedType || !(selectedType instanceof String)) {
            isCorrectType = false;
        }
        const now = new Date();
        if (!deadline || deadline < now) {
            isCorrectDeadline = false;
        }
        const val = Number(value);
        if ((!val) || (val > 0)) {
            isCorrectValue = false;
        }
        return [isCorrectType, isCorrectDeadline, isCorrectValue];
    }
}
