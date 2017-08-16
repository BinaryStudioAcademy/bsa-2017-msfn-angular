import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';
import { WindowObj } from '../../../services/window.service';
import { timeZone } from './timeZones';

@Injectable()
export class SettingsService {

    constructor(
        private httpService: HttpService,
        private window: WindowObj
    ) { }

    getMeasurements() {
        const request: IHttpReq = {
            url: '/api/measurement/',
            method: 'GET',
            body: ''
        };

        this.httpService.sendRequest(request).then(res => {
            console.log(res);
            return res;
        });
    }

    getUserSettings() {
        const request: IHttpReq = {
            url: '/api/user/' + (this.window.data._injectedData as any).userId,
            method: 'GET',
            body: ''
        };

        this.httpService.sendRequest(request).then(res => {
            return res.settings;
        });
    }

    getTimeZone() {
        return timeZone;
    }

    saveSettings(settings) {
        const request: IHttpReq = {
            url: '/api/user/' + (this.window.data._injectedData as any).userId,
            method: 'PUT',
            body: settings
        };

        this.httpService.sendRequest(request).then(res => {
            console.log(res);
        });
    }
}
