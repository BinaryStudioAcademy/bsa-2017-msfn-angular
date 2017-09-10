import { IHttpReq } from './../../../models/http-req';
import { HttpService } from './../../../services/http.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AchievementsListService {

    constructor(private httpService: HttpService) { }

    getAllAchievements(callback) {
            const sendData: IHttpReq = {
            url: '/api/achievements',
            method: 'GET',
            body: {},
        };

        this.httpService.sendRequest(sendData).then(data => {
            callback(data);
        });
    }

}
