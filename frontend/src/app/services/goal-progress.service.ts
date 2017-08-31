import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IHttpReq } from '../models/http-req';
import { WeightControlService } from '../user/user.components/weight-control/weight-control.service';

@Injectable()
export class GoalProgressService {

    constructor(private httpService: HttpService,
                private weightControlService: WeightControlService) { }

    goals = [];
    weightItems = [];

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

    getGoals(): void {
        this.getGoalData(res => {
            if (res[0].hasOwnProperty('value')) {
                this.goals = res;
            } else {
                this.goals = [];
            }
        });
    }

    getWeightData(): void {
        this.weightControlService.getWeightItems(res => {
            if (res[0].hasOwnProperty('weight')) {
                this.weightItems = res;
            }
        });
    }
}
