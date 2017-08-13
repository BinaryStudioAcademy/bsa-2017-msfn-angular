import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { IHttpReq } from '../../models/http-req';

@Injectable()
export class ProfileService {

  constructor(private httpService: HttpService) { }

  savePhoto(image, userId, fileType, callback) {
    const sendData: IHttpReq = {
      url: '/api/file',
      method: 'POST',
      body: { data: image, userId: userId, fileType: fileType },
    };

    this.httpService.sendRequest(sendData).then(data => { callback(data); });
  }

  updateProfile(userData, callback, errorCallback) {
    const request: IHttpReq = {
      url: '/api/coach/apply/',
      method: 'PUT',
      body: userData
    };

    this.httpService.sendRequest(request)
      .then(res => {
        if (res === userData) {
          callback();
        } else {
          errorCallback();
        }
      });
  }

  getUser(id, callback) {
    const request: IHttpReq = {
      url: '/api/user/' + id,
      method: 'GET',
      body: ''
    };
    this.httpService.sendRequest(request).then(res => { callback(res); });
  }

  updateUser(user, id) {
    const request: IHttpReq = {
      url: '/api/user/' + id,
      method: 'PUT',
      body: user
    };
    this.httpService.sendRequest(request);
  }
}
