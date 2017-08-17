import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';
import {CropperSettings} from 'ng2-img-cropper';

@Injectable()
export class ProfileService {


  constructor(private httpService: HttpService) { }

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


    updateUser(user, id, callback) {
        const request: IHttpReq = {
            url: '/api/user/' + id,
            method: 'PUT',
            body: user,
            failMessage: 'Failed to change profile',
            successMessage: 'Profile changes accepted'
        };
        this.httpService.sendRequest(request).then(res => {
            callback(res);
        });
    }

    addNewEmail(email, id, callback) {
        const request: IHttpReq = {
            url: '/api/user/secondaryEmail/' + id,
            method: 'PUT',
            body: {
                newSecondaryEmail: email
            },
            failMessage: 'Failed to add email',
            successMessage: 'Secondary email added'
        };
        this.httpService.sendRequest(request).then(res => {
            callback(res);
        });
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
