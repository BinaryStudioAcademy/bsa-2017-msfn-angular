import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';

@Injectable()
export class FoodPlanListService {

    constructor(
        private httpService: HttpService
    ) { }

    getPlans(callback) {
    }

}
