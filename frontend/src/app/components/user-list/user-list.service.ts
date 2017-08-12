import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { IHttpReq } from '../../models/http-req';

@Injectable()
export class UserListService {

  constructor(private httpService: HttpService) { }

  getUsers(callback): void {
    const request: IHttpReq = {
      url: '/api/user',
      method: 'GET',
      body: {}
    };
    this.httpService.sendRequest(request).then(data => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        let role = 'user';

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

  sortData(data, column, direction) {
    return data.sort((a, b) => {
      let propA = '';
      let propB = '';

      switch (column) {
        case 'name': [propA, propB] = [a.name, b.name];
          break;
        case 'type': [propA, propB] = [a.type, b.type];
          break;
      }

      const valueA = isNaN(+propA) ? propA : +propA;
      const valueB = isNaN(+propA) ? propB : +propB;

      return (valueA < valueB ? -1 : 1) * (direction === 'asc' ? 1 : -1);
    });
  }
}
