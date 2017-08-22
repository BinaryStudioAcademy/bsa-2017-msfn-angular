import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { IHttpReq } from '../../models/http-req';

@Injectable()
export class AdminService {

  constructor(private httpService: HttpService) { }

    processCoachRequest(id, data, callback) {
        const request: IHttpReq = {
            url: '/api/user/coach-request/' + id,
            method: 'PUT',
            body: data,
            failMessage: 'Failed to change user profile',
            successMessage: 'User profile changes accepted'
        };

        this.httpService.sendRequest(request).then(res => {
            callback(res);
        });
    }
}
