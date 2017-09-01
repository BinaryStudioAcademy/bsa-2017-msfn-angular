import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IHttpReq } from '../models/http-req';
import { WeightControlService } from '../user/user.components/weight-control/weight-control.service';

@Injectable()
export class GoalProgressService {

    constructor(private httpService: HttpService,
                private weightControlService: WeightControlService) { }

    getWeightLossProgress(items: any[], goal) {
        console.log('WEIGHT PROGRESS INIT', items, goal);
        const goalTimeStamp = new Date(goal.startTime).getTime(),
            currentWeight = items[items.length - 1];

        const startWeight = items.find(item => {
            return goalTimeStamp - new Date(item.date).getTime() < 86400000;
        });

        return {
            start: startWeight.weight,
            current: currentWeight.weight,
            goal: goal.value
        };
    }

    getWeightGainProgress(items: any[], goal) {
    }

    getLaunchedTrainingData(id, callback) {
        const sendData: IHttpReq = {
            url: `/api/launchedtraining/user/${id}`,
            method: 'GET',
            body: {},
        };

        this.httpService.sendRequest(sendData)
            .then(data => {
                callback(data);
            });
    }

}
