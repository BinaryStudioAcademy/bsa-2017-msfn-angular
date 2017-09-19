import {Injectable} from '@angular/core';
import {IHttpReq} from '../models/http-req';
import {HttpService} from './http.service';
import { WindowObj } from './window.service';

@Injectable()
export class ConstantsService {

    public measurements;

    constructor(private windowObj: WindowObj, private httpService: HttpService) {
        if (windowObj.data._injectedData.isLoggedIn) {
            this.setMeasurements();
        } else {
            this.measurements = {};
        }
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
