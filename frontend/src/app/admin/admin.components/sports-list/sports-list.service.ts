import { Injectable } from '@angular/core';
import { IHttpReq } from '../../../models/http-req';
import { HttpService } from '../../../services/http.service';

@Injectable()
export class SportsListService {

  constructor(private httpService: HttpService) { }


  getKindsOfSport(callback): void {
    const request: IHttpReq = {
      url: '/api/sport',
      method: 'GET',
      body: {}
    };
    this.httpService.sendRequest(request).then(res => {
            callback(res);
        });
  }

}
