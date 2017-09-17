import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';

@Injectable()
export class TribeService {

    constructor(
        private httpService: HttpService
    ) { }

    getUserById(id, callback) {
        const request: IHttpReq = {
            url: '/api/user/' + id,
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request)
            .then(data => {
                callback(data);
            });
    }

}
