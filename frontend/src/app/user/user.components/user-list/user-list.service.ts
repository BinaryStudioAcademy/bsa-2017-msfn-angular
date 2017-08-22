import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';

@Injectable()
export class UserListService {
    constructor(private httpService: HttpService) {}

    getAllUsers(callback) {
        const request: IHttpReq = {
            url: '/api/user',
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request).then(data => {
            for (let i = 0; i < data.length; i++) {
                let role = 'usual';
                if (data[i].isCoach) {
                    role = 'coach';
                }
                if (data[i].isAdmin) {
                    role = 'admin';
                }
                data[i].role = role;
            }
            callback(data);
        });
    }
}
