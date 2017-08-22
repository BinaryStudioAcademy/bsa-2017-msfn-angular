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

    getMeasurements(callback) {
        const request: IHttpReq = {
            url: '/api/measurement/',
            method: 'GET',
            body: ''
        };

        this.httpService.sendRequest(request).then(res => {
            callback(res);
        });
    }

    getUserSettings(callback) {
        const request: IHttpReq = {
            url: '/api/user/' + (this.window.data._injectedData as any).userId,
            method: 'GET',
            body: ''
        };

        this.httpService.sendRequest(request).then(res => {
            callback(res);
        });
    }

    convertSettings(measurement) {
        const settings = {};
        measurement.forEach(el => {
            if (!el.isRemoved) {
                settings[el.measureName] = [];
                el.measureUnits.forEach(unit => {
                    settings[el.measureName].push({ type: unit.unitType, name: unit.unitName });
                });
            }
        });
        return settings;
    }

    setUnitFormat(userSettings, settings) {
        if (userSettings.unitType !== 'default') {
            for (const key in userSettings) {
                if (userSettings.hasOwnProperty(key) && settings.hasOwnProperty(key)) {
                    let value;
                    settings[key].forEach(el => {
                        if (el.type === userSettings.unitType) {
                            value = el.name;
                        }
                    });
                    userSettings[key] = value;
                }
            }
            userSettings.trainingWeight = userSettings.weight;
        }
        return userSettings;
    }

    checkUnitFormat(userSettings, settings) {
        const typesArray = [];
        for (const key in userSettings) {
            if (userSettings.hasOwnProperty(key) && settings.hasOwnProperty(key)) {
                settings[key].forEach(el => {
                    if (el.name === userSettings[key]) {
                        typesArray.push(el.type);
                    }
                });
            }
        }
        if (typesArray.every(el => el === 'metric')) {
            return 'metric';
        } else if (typesArray.every(el => el === 'imperial')) {
            return 'imperial';
        } else {
            return 'default';
        }
    }

    getTimeZone() {
        return timeZone;
    }

    saveSettings(settings, callback) {
        const request: IHttpReq = {
            url: '/api/user/' + (this.window.data._injectedData as any).userId,
            method: 'PUT',
            body: settings
        };

        this.httpService.sendRequest(request).then(res => {
            callback(res);
        });
    }
}
