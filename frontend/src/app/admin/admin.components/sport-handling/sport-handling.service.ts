import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';

@Injectable()
export class SportHandlingService {

    constructor(private httpService: HttpService) { }

    kindsOfSport: any[];

    getKindsOfSport(callback): void {
        const request: IHttpReq = {
            url: '/api/sport',
            method: 'GET',
            body: {}
        };

        this.httpService.sendRequest(request).then(res => {
            this.kindsOfSport = res;
            console.log(res);
            callback(res);
        });
    }

    checkExistence(name: string) {
        const findByName = item => {
            return item.name === name;
        };

        return this.kindsOfSport.find(findByName);
    }

    addSport(data, callback) {
        console.log(data);
        const request: IHttpReq = {
            url: '/api/sport',
            method: 'POST',
            body: data
        };

        this.httpService.sendRequest(request).then(res => {
            console.log(res);
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
            console.log(res);
            callback(res);
        });
    }
}
