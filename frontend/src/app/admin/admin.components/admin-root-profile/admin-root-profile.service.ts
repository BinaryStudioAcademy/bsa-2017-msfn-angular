import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';

@Injectable()
export class AdminRootProfileService {


  constructor(private httpService: HttpService) { }

  getProfile(_id, callback) {
    const request: IHttpReq = {
      url: '/api/user/' + _id,
      method: 'GET',
      body: {}
    };
    this.httpService.sendRequest(request)
        .then(data => {
            callback(data);
        });
    }

//   updateProfile(userData, callback) {
//     const request: IHttpReq = {
//       url: '/api/exercise-list',
//       method: 'PUT',
//       body: userData
//     };
//     this.httpService.sendRequest(request).then(data => {
//       console.log(data);
//       callback();
//     });
//   }
}
