import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';


@Injectable()
export class FoodTrackingService {

    constructor(
        private httpService: HttpService,
    ) { }

    getFoodPlan(callback): void {
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
}
