import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';

@Injectable()
export class FoodPlanListService {

    constructor(
        private httpService: HttpService
    ) { }

    getPlans(callback) {
        const sendData: IHttpReq = {
            url: '/api/food-plan/',
            method: 'GET',
            body: {},
        };

        this.httpService.sendRequest(sendData)
            .then(data => {
                callback(data);
            });
    }

}
