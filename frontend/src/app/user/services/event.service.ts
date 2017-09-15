import {Injectable} from '@angular/core';
import {CropperSettings} from 'ng2-img-cropper';
import {IHttpReq} from '../../models/http-req';
import {HttpService} from '../../services/http.service';

@Injectable()
export class EventService {

    constructor(private httpService: HttpService) {
    }

    getAllItems(callback) {
        const req: IHttpReq = {
            url: '/api/event',
            method: 'GET',
            body: {}
        };

        this.httpService.sendRequest(req)
            .then(data => {
                callback(data);
            });
    }

    createEvent(eventData, callback): void {
        const req: IHttpReq = {
            url: '/api/event',
            method: 'POST',
            body: eventData,
            successMessage: 'Event has been created',
            failMessage: 'Event creation has been failed'
        };

        this.httpService.sendRequest(req)
            .then(data => callback(data));
    }

    getUserLocation(callback) {
        navigator.geolocation.getCurrentPosition(position => {
            const location = {
                lat: position.coords.latitude || 0,
                lng: position.coords.longitude || 0
            };
            callback(location);
        });
    }

    saveImage(image, userId, fileType, callback): void {
        const sendData: IHttpReq = {
            url: '/api/file',
            method: 'POST',
            body: {
                data: image,
                fileName: userId,
                fileType: fileType,
                folder: 'events'
            }
        };

        this.httpService.sendRequest(sendData).then(data => {
            callback(data);
        });
    }

    getCropperSettings(): CropperSettings {
        const cropperSettings = new CropperSettings();
        cropperSettings.noFileInput = true;
        cropperSettings.width = 300;
        cropperSettings.height = 200;
        cropperSettings.croppedWidth = 600;
        cropperSettings.croppedHeight = 400;
        cropperSettings.canvasWidth = 300;
        cropperSettings.canvasHeight = 200;
        cropperSettings.dynamicSizing = true;
        cropperSettings.preserveSize = true;
        cropperSettings.touchRadius = 10;
        return cropperSettings;
    }
}
