import {Injectable} from '@angular/core';
import {IHttpReq} from '../models/http-req';
import {HttpService} from './http.service';

@Injectable()
export class ConstantsService {

    public measurements;

    constructor(private httpService: HttpService) {
        this.setMeasurements();
    }

    getMeasurements() {
        return this.measurements;
    }

    setMeasurements() {
        const request: IHttpReq = {
            url: '/api/measurement/',
            method: 'GET',
            body: ''
        };

        this.httpService.sendRequest(request).then(res => {
            this.measurements = res;
        });
    }

}
