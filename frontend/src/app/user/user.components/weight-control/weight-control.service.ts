import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';

@Injectable()
export class WeightControlService {

    constructor(private httpService: HttpService) { }

    getWeightItems(callback) {
        const request: IHttpReq = {
            url: '/api/weight-control',
            method: 'GET',
            body: {}
        };

        this.httpService.sendRequest(request).then(res => {
            callback(res);
        });
    }

    addWeight(data, callback) {
        const request: IHttpReq = {
            url: '/api/weight-control/add',
            method: 'PUT',
            body: data
        };

        this.httpService.sendRequest(request).then(res => {
            console.log('RES', res);
            callback(res);
        });
    }
}
