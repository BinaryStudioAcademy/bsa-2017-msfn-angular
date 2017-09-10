import { Injectable } from '@angular/core';
import { IHttpReq } from '../../../models/http-req';
import { HttpService } from '../../../services/http.service';

@Injectable()
export class MessagePostingService {

    constructor(private httpService: HttpService) {
    }

    getMessages(userId: string, callback): void {
        const req: IHttpReq = {
            url: `/api/message/user/${userId}`,
            method: 'GET',
            body: {}
        };

        this.httpService.sendRequest(req)
            .then(data => {
                callback(data);
            });
    }

    postMessage(message, callback): void {
        const req: IHttpReq = {
            url: '/api/message',
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
