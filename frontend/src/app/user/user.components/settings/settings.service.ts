import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';

@Injectable()
export class SettingsService {

    constructor(private httpService: HttpService) { }

    getMeasurements() {
        const request: IHttpReq = {
            url: '/api/measurement/',
            method: 'GET',
            body: ''
        };

        this.httpService.sendRequest(request).then(res => {
            console.log(res);
        });
    }
}
