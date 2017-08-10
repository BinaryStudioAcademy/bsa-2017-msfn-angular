import { Injectable } from '@angular/core';
import { months } from './month';
import { IHttpReq } from '../../models/http-req';
import { HttpService } from '../../services/http.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProfileService {


  constructor(private http: HttpClient, private httpHandler: HttpService) { }

  getMonth() {
    return months;
  }

  getYears(): number[] {
    const years = [];
    const date = new Date();
    const currentYear = date.getFullYear();
    for (let i = 1900; i <= currentYear; i++) {
      years.push(i);
    }
    return years;
  }

  getDays(monthIn: string, yearIn: number): number[] {
    const daysOutput = [];
    let monthLength;

    if (monthIn === 'February' &&
      (yearIn % 4 === 0 && yearIn % 100 !== 0 || yearIn % 400 === 0)) {
      monthLength = 29;
    } else {
      for (const month of months) {
        if (monthIn === month.value) {
          monthLength = month.days;
        }
      }
    }

    for (let i = 1; i <= monthLength; i++) {
      daysOutput.push(i);
    }
    return daysOutput;
  }

  savePhoto(image) {
    const sendData: IHttpReq = {
      url: '/api/file',
      method: 'POST',
      body: { img: image, name: 'id1' }
    };

    this.httpHandler.sendRequest(sendData);
  }

}
