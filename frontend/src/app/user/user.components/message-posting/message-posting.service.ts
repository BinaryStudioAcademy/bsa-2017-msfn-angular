import { Injectable } from '@angular/core';
import { IHttpReq } from '../../../models/http-req';
import { HttpService } from '../../../services/http.service';

@Injectable()
export class MessagePostingService {

    constructor(private httpService: HttpService) {
    }

    postMessage(message, callback): void {
        const req: IHttpReq = {
            url: '/api/post',
            method: 'POST',
            body: message,
            successMessage: 'Message is posted',
            failMessage: 'Message posting has failed'
        };

        this.httpService.sendRequest(req)
            .then(data => {
                callback(data);
            });
    }
}
