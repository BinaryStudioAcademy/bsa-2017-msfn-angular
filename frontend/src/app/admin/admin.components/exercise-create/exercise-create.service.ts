import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';
import { CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';

@Injectable()
export class ExerciseCreateService {

    constructor(private httpService: HttpService) { }

    getExerciseTypes(callback): void {
        const request: IHttpReq = {
            url: '/api/exercise-type/',
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request)
            .then(data => {
                callback(data);
        });
    }

    getMeasures(callback) {
        const request: IHttpReq = {
            url: '/api/measurement/',
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request)
            .then(data => {
                callback(data);
        });
    }

    getSportTypes(callback) {
        const request: IHttpReq = {
            url: '/api/sport/',
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request)
            .then(data => {
                callback(data);
        });
    }

    getExerciseById(id, callback): void {
        const request: IHttpReq = {
            url: '/api/exercise/' + id,
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request)
            .then(data => {
                callback(data);
        });
    }

    sendExercise(exerciseForm) {
        const request: IHttpReq = {
            url: '/api/exercise/',
            method: 'POST',
            body: exerciseForm,
            successMessage: 'Added'
        };
        this.httpService.sendRequest(request);
    }

    updateExercise(id, exerciseForm) {
        const request: IHttpReq = {
            url: '/api/exercise/' + id,
            method: 'PUT',
            body: {
                name: exerciseForm.name,
                typeId: exerciseForm.typeId,
                description: exerciseForm.description,
                image: exerciseForm.image,
                sports: exerciseForm.sports
            },
            successMessage: 'Edited'
        };
        this.httpService.sendRequest(request);
    }

    saveImg(image, fileName, fileType, folder, callback) {
        const sendData: IHttpReq = {
            url: '/api/file',
            method: 'POST',
            body: {data: image, fileName: fileName, fileType: fileType, folder: folder},
        };

        this.httpService.sendRequest(sendData).then(data => {
            callback(data);
        });
    }

    getCropperSettings(): CropperSettings {
        const cropperSettings = new CropperSettings();
        cropperSettings.noFileInput = true;
        cropperSettings.width = 150;
        cropperSettings.height = 150;
        cropperSettings.croppedWidth = 150;
        cropperSettings.croppedHeight = 150;
        cropperSettings.canvasWidth = 150;
        cropperSettings.canvasHeight = 150;
        cropperSettings.dynamicSizing = true;
        cropperSettings.touchRadius = 10;
        return cropperSettings;
    }
}
