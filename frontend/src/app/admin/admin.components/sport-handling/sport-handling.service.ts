import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';

@Injectable()
export class SportHandlingService {

    constructor(private httpService: HttpService) { }

    iconBaseUrl = './resources/sport-icons/';
    icons = [
        `${this.iconBaseUrl}arrow.png`,
        `${this.iconBaseUrl}barbell.png`,
        `${this.iconBaseUrl}coach.png`,
        `${this.iconBaseUrl}daily.png`,
        `${this.iconBaseUrl}diet.png`,
        `${this.iconBaseUrl}man.png`
    ];

    kindsOfSport: any[];

    getKindsOfSport(callback): void {
        const request: IHttpReq = {
            url: '/api/sport',
            method: 'GET',
            body: {}
        };

        this.httpService.sendRequest(request).then(res => {
            this.kindsOfSport = res;
            callback(res);
        });
    }


    getKindsOfSportByCode(code, callback): void {
        const request: IHttpReq = {
            url: '/api/sport/' + code.toString(),
            method: 'GET',
            body: {}
        };

        this.httpService.sendRequest(request).then(res => {
            callback(res);
        });
    }

    addSport(data, callback) {
        const request: IHttpReq = {
            url: '/api/sport',
            method: 'POST',
            body: data
        };

        this.httpService.sendRequest(request).then(res => {
            callback(res);
        });
    }

    updateSport(code, data, callback) {
        const request: IHttpReq = {
            url: `/api/sport/${code}`,
            method: 'PUT',
            body: data
        };

        this.httpService.sendRequest(request).then(res => {
            callback(res);
        });
    }

    getExercisesBySport(code, callback) {
        const request: IHttpReq = {
            url: `api/exercise/sport/${code}`,
            method: 'GET',
            body: {}
        };

        this.httpService.sendRequest(request).then(res => {
            callback(res);
        });
    }

    updateExercise(code, data) {
        const request: IHttpReq = {
            url: `/api/exercise/sport/${code}`,
            method: 'PUT',
            body: data
        };

        this.httpService.sendRequest(request);
    }

    removeExercise(data, callback) {
        const request: IHttpReq = {
            url: '/api/exercise/sport',
            method: 'POST',
            body: data
        };

        this.httpService.sendRequest(request).then(res => {
            callback(res);
        });
    }
}
