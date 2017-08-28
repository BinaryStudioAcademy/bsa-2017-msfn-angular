import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';

@Injectable()
export class TrainingListService {

    constructor(
        private httpService: HttpService
    ) { }

    getPlans(callback) {
        const sendData: IHttpReq = {
            url: '/api/training-plan',
            method: 'GET',
            body: {},
        };

        this.httpService.sendRequest(sendData)
            .then(data => {
                callback(data);
        });
    }

    removePlan(id) {
        const sendData: IHttpReq = {
            url: '/api/training-plan/' + id,
            method: 'DELETE',
            body: {},
            successMessage: 'Plan is removed'
        };

        this.httpService.sendRequest(sendData);
    }

}
