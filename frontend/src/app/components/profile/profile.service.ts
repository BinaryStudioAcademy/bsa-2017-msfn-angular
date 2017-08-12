import { Injectable } from '@angular/core';
import { months } from './month';
import { HttpService } from '../../services/http.service';
import { IHttpReq } from '../../models/http-req';
import { CropperSettings } from 'ng2-img-cropper';

@Injectable()
export class ProfileService {

    constructor(private httpService: HttpService) {
    }

    getMonth() {
        return months;
    }

    getYears(): number[] {
        const years = [];
        const date = new Date();
        const currentYear = date.getFullYear();
        for (let i = 1900; i <= currentYear; i++) {
            years.push(i);
        }
        return years;
    }

    getDays(monthIn: string, yearIn: number): number[] {
        const daysOutput = [];
        let monthLength;

        if (monthIn === 'February' &&
            (yearIn % 4 === 0 && yearIn % 100 !== 0 || yearIn % 400 === 0)) {
            monthLength = 29;
        } else {
            for (const month of months) {
                if (monthIn === month.value) {
                    monthLength = month.days;
                }
            }
        }

        for (let i = 1; i <= monthLength; i++) {
            daysOutput.push(i);
        }
        return daysOutput;
    }

    savePhoto(image, userId, fileType, callback) {
        const sendData: IHttpReq = {
            url: '/api/file',
            method: 'POST',
            body: {data: image, userId: userId, fileType: fileType},
        };

        this.httpService.sendRequest(sendData).then(data => {
            callback(data);
        });
    }

    updateProfile(userData, callback, errorCallback) {
        const request: IHttpReq = {
            url: '/api/coach/apply/',
            method: 'PUT',
            body: userData
        };

        this.httpService.sendRequest(request)
            .then(res => {
                if (res === userData) {
                    callback();
                } else {
                    errorCallback();
                }
            });
    }

    getUser(id, callback) {
        const request: IHttpReq = {
            url: '/api/user/' + id,
            method: 'GET',
            body: ''
        };
        this.httpService.sendRequest(request).then(res => {
            callback(res);
        });
    }

    updateUser(user, id) {
        const request: IHttpReq = {
            url: '/api/user/' + id,
            method: 'PUT',
            body: user
        };
        this.httpService.sendRequest(request);
    }

    getCropperSettings(): CropperSettings {
        const cropperSettings = new CropperSettings();
        cropperSettings.noFileInput = true;
        cropperSettings.width = 150;
        cropperSettings.height = 150;
        cropperSettings.croppedWidth = 150;
        cropperSettings.croppedHeight = 150;
        cropperSettings.canvasWidth = 400;
        cropperSettings.canvasHeight = 300;
        cropperSettings.rounded = true;
        cropperSettings.dynamicSizing = true;
        cropperSettings.touchRadius = 10;
        return cropperSettings;
    }
}
