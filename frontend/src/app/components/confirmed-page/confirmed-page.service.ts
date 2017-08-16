import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { IHttpReq } from '../../models/http-req';

@Injectable()
export class ConfirmedPageService {

  constructor(private httpService: HttpService) { }

  checkRegistrationToken(token, callback) {
    // console.log(token);
    const request: IHttpReq = {
        url: '/api/user/activate/' + token,
        method: 'GET',
        body: ''
    };
    this.httpService.sendRequest(request).then(res => {
        callback(res);
    });
  }

  checkRootEmailToken(token, callback) {
    const request: IHttpReq = {
        url: '/api/user/activate/changemail/' + token,
        method: 'GET',
        body: ''
    };
    this.httpService.sendRequest(request).then(res => {
        callback(res);
    });
  }
}
