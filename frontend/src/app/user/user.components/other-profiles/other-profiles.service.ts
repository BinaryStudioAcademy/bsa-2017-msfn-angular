import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';

@Injectable()
export class OtherProfilesService {

    constructor(private httpService: HttpService) { }

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
}
