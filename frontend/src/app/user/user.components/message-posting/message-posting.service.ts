import { Injectable } from '@angular/core';
import { IHttpReq } from '../../../models/http-req';
import { HttpService } from '../../../services/http.service';

@Injectable()
export class MessagePostingService {

    constructor(private httpService: HttpService) {
    }

    getMessages(userId: string, callback, isTestimonial?: boolean): void {
        const req: IHttpReq = {
            url: isTestimonial ?
                `/api/coach/testimonial/${userId}` :
                `/api/message/user/${userId}`,
            method: 'GET',
            body: {}
        };

        this.httpService.sendRequest(req)
            .then(data => {
                callback(data);
            });
    }

    postMessage(message, callback): void {
        let route: string;
        if (message.hasOwnProperty('coach')) {
            route = '/api/coach/testimonial';
        } else if (message.hasOwnProperty('event')) {
            route = '/api/event/message';
        } else {
            route = '/api/message';
        }

        const req: IHttpReq = {
            url: route,
            method: 'POST',
            body: message,
            successMessage: 'Message hass been posted',
            failMessage: 'Message posting has been failed'
        };

        this.httpService.sendRequest(req)
            .then(data => {
                callback(data);
            });
    }

    updateMessage(id: string, message, callback): void {
        const req: IHttpReq = {
            url: `/api/message/${id}`,
            method: 'PUT',
            body: message,
            successMessage: 'Message has been edited',
            failMessage: 'Message edit has been failed'
        };

        this.httpService.sendRequest(req)
            .then(data => {
                callback(data);
            });
    }

    deleteMessage(id: string, callback): void {
        const req: IHttpReq = {
            url: `/api/message/${id}`,
            method: 'DELETE',
            body: {},
            successMessage: 'Message has been deleted',
            failMessage: 'Message deletion has been failed'
        };

        this.httpService.sendRequest(req)
            .then(() => {
                callback();
            });
    }
}
