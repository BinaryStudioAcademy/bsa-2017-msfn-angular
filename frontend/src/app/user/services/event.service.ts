import {Injectable} from '@angular/core';
import {CropperSettings} from 'ng2-img-cropper';
import {IHttpReq} from '../../models/http-req';
import {HttpService} from '../../services/http.service';
import {DateService} from '../../services/date.service';

@Injectable()
export class EventService {

    constructor(private httpService: HttpService,
                private dateService: DateService) {
    }

    getItem(id: string, callback) {
        const req: IHttpReq = {
            url: '/api/event/' + id,
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(req)
            .then(data => {
                callback(data);
            });
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

    getPeriodItems(dates, callback) {
        const startTimeStamp = dates.startDate.getTime();
        const endTimeStamp = dates.endDate.getTime();

        const req: IHttpReq = {
            url: `/api/event/period/${startTimeStamp}/${endTimeStamp}`,
            method: 'GET',
            body: dates
        };
        this.httpService.sendRequest(req)
            .then(data => {
                if (!data[0].hasOwnProperty('creator')) {
                    data = [];
                }
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

    updateEvent(id, eventData, callback): void {
        const req: IHttpReq = {
            url: '/api/event/' + id,
            method: 'PUT',
            body: eventData,
            successMessage: 'Event has been updated',
            failMessage: 'Event update has been failed'
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

    getParticipants(id, callback) {
        const req: IHttpReq = {
            url: '/api/event/participants/' + id,
            method: 'GET',
            body: {},
            failMessage: 'Can\'t show participants'
        };
        this.httpService.sendRequest(req).then(data => {
            console.log('PART DATA', data);
            callback(data);
        });
    }

    getFollowers(id, callback) {
        const req: IHttpReq = {
            url: '/api/event/followers/' + id,
            method: 'GET',
            body: {},
            failMessage: 'Can\'t show followers'
        };
        this.httpService.sendRequest(req).then(data => {
            callback(data);
        });
    }

    getMessages(id, callback) {
        const req: IHttpReq = {
            url: '/api/event/messages/' + id,
            method: 'GET',
            body: {},
            failMessage: 'Can\'t show messages'
        };
        this.httpService.sendRequest(req).then(data => {
            callback(data);
        });
    }

    participate(eventId: string, userId: string, callback) {
        const req: IHttpReq = {
            url: '/api/event/apply/' + eventId,
            method: 'PUT',
            body: {
                fieldName: 'participants',
                userId
            }
        };
        this.httpService.sendRequest(req).then(data => {
            if (data) {
                callback(null, data);
            }
        });
    }

    unparticipate(eventId: string, userId: string, callback) {
        const req: IHttpReq = {
            url: '/api/event/unparticipate/' + eventId,
            method: 'PUT',
            body: {
                userId
            }
        };
        this.httpService.sendRequest(req).then(data => {
            if (data) {
                callback(null, data);
            }
        });
    }

    follow(eventId: string, userId: string, callback) {
        const req: IHttpReq = {
            url: '/api/event/follow/' + eventId,
            method: 'PUT',
            body: {
                userId
            }
        };
        this.httpService.sendRequest(req).then(data => {
            if (data) {
                callback(null, data);
            }
        });
    }

    unfollow(eventId: string, userId: string, callback) {
        const req: IHttpReq = {
            url: '/api/event/unfollow/' + eventId,
            method: 'PUT',
            body: {
                userId
            }
        };
        this.httpService.sendRequest(req).then(data => {
            if (data) {
                callback(null, data);
            }
        });
    }

    setDateOutput(item, isMessage?: boolean): void {
        if (isMessage) {
            item.dateOutput = this.dateService
                .convertDateToIso(new Date(item.date), true);
        } else {
            item.startDateOutput = this.dateService
                .convertDateToIso(new Date(item.startDate), true);
            item.endDateOutput = this.dateService
                .convertDateToIso(new Date(item.endDate), true);
        }
    }

    isUserApplied(event, userId: string) {
        if (event.participants.includes(userId)) {
            event.isParticipating = true;
        }
        if (event.followers.includes(userId)) {
            event.isParticipating = true;
        }
    }
}
