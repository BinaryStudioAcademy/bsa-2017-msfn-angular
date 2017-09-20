import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';


@Injectable()
export class FoodTrackingService {

    constructor(
        private httpService: HttpService,
    ) { }

    getFoodPlans(callback): void {
        const request: IHttpReq = {
            url: '/api/food-plan/',
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request)
            .then(data => {
                callback(data);
            });
    }

    getCurentLaunchedFoodPlan(callback): void {
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

    createLaunchedFoodPlan(data, callback): void {
        const request: IHttpReq = {
            url: '/api/launchedfoodplan',
            method: 'POST',
            body: data
        };

        this.httpService.sendRequest(request)
            .then(res => {
                callback(res);
            });
    }

    updateLaunchedFoodPlan(data, callback): void {
        const request: IHttpReq = {
            url: '/api/launchedfoodplan',
            method: 'PUT',
            body: data
        };

        this.httpService.sendRequest(request)
            .then(res => {
                callback(res);
            });
    }
}
