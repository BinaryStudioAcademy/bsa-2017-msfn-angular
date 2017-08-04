import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';
// import { Http, Response } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/throw';

@Injectable()
export class HttpService {

  constructor(public snackBar: MdSnackBar) { }

  sendRequest(options, callback) {
    let url: string;
    if (options.url) {
      url = options.url;
    } else {
      callback('Error url');
      return;
    }
    const method: string = options.method || 'GET';
    const body = options.body || {};
    const successMessage: string = options.successMessage || 'Success';
    const failMessage: string = options.failMessage || 'Fail';
    const xmlHttp = new XMLHttpRequest();

    xmlHttp.open(method, url, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(body));

    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState === 4) {
        if (xmlHttp.status === 200) {
          this.openSnackBar(successMessage);
          callback(xmlHttp.responseText);
        } else if (xmlHttp.status >= 500) {
          this.openSnackBar(failMessage);
          callback(xmlHttp.responseText);
        } else if (xmlHttp.status === 404) {
          this.openSnackBar(failMessage);
          callback(xmlHttp.responseText);
        } else if (xmlHttp.status >= 403) {
          this.openSnackBar(failMessage);
          callback(xmlHttp.responseText);
        } else if (xmlHttp.status >= 400) {
          this.openSnackBar(failMessage);
          callback(xmlHttp.responseText);
        }
      }
    };
  }

  openSnackBar(message: string, action = 'close') {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

}
