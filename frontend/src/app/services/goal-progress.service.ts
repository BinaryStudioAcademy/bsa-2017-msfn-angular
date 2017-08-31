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

    getWeightLossProgress(items: any[]) {
        console.log('WEIGHT PROGRESS INIT', items);
    }

    getWeightGainProgress(items: any[]) {
        console.log('WEIGHT PROGRESS INIT', items);
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
