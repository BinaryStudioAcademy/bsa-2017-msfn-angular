import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';

@Injectable()
export class SetGoalsService {
    data = [{
        name: 'Lose weight'
    },
    {
        name: 'Run'
    },
    {
        name: 'Food'
    }];
    constructor(private httpService: HttpService) {


    }
    getGoals(callback) {
        const request: IHttpReq = {
            url: '/api/goal',
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request).then(data => {
            callback(data);
        });
    }
}
