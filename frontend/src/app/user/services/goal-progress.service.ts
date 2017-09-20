import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { IHttpReq } from '../../models/http-req';

@Injectable()
export class GoalProgressService {

    constructor(private httpService: HttpService) { }

    getWeightProgress(items: any[], goal) {
        const startTimeStamp = new Date(goal.startTime).getTime(),
            currentWeight = items[items.length - 1];

        const startValue = items.find(item => {
            return startTimeStamp - new Date(item.date).getTime() < 86400000;
        });

        return {
            start: startValue.weight,
            current: currentWeight.weight,
            goal: goal.value
        };
    }

    getTrainingCountProgress(items: any[], goal) {
        const startTimeStamp = new Date(goal.startTime).getTime(),
            endTimeStamp = startTimeStamp + 604800000;

        const foundTrainingItems = items.filter(item => {
            const itemTimeStamp = new Date(item.startDate).getTime();
            return itemTimeStamp > startTimeStamp && itemTimeStamp < endTimeStamp;
        });

        return {
            start: 0,
            current: foundTrainingItems.length,
            goal: goal.value
        };
    }

    getExerciseCountProgress(items: any[], goal) {
        const startTimeStamp = new Date(goal.startTime).getTime(),
            endTimeStamp = startTimeStamp + 604800000;
        let exerciceSum = 0;

        for (const item of items) {
            const itemTimeStamp = new Date(item.startDate).getTime();
            if (itemTimeStamp > startTimeStamp && itemTimeStamp < endTimeStamp) {
                exerciceSum += item.exercisesList.length;
            }
        }

        return {
            start: 0,
            current: exerciceSum,
            goal: goal.value
        };
    }

    getLaunchedTrainingData(id, callback) {
        const req: IHttpReq = {
            url: `/api/launchedtraining/user/${id}`,
            method: 'GET',
            body: {},
        };

        this.httpService.sendRequest(req)
            .then(data => {
                callback(data);
            });
    }

    getUserGoals(callback) {
        const req: IHttpReq = {
            url: 'api/user-goal',
            method: 'GET',
            body: {},
        };

        this.httpService.sendRequest(req)
            .then(data => {
                callback(data);
            });
    }

}
