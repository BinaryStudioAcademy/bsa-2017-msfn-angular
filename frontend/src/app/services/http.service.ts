import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Headers, Http, Response } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  // public failMessage = 'Fail';

  constructor(private _http: Http, public snackBar: MdSnackBar) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    // this.openSnackBar(this.failMessage);
    return Promise.reject(error.message || error);
  }

  sendReq(options) {
    let url: string;
    if (!options.url) {
      return 'Error url';
    } else {
      url = options.url;
    }
    const method: 'GET' | 'POST' | 'PUT' | 'DELETE' = options.method || 'GET';
    const body = options.body || {};
    const successMessage: string = options.successMessage || 'Success';
    const failMessage: string = options.failMessage || 'Fail';
    const headers = options.headers || this.headers;

    if (method === 'GET') {
      return this._http.get(url)
        .toPromise()
        .then(response => {
          this.openSnackBar(successMessage);
          return response.json().data;
        })
        .catch(this.handleError);
    } else if (method === 'POST') {
      return this._http
        .post(url, body, { headers: this.headers })
        .toPromise()
        .then(res => {
          this.openSnackBar(successMessage);
          return res.json().data;
        })
        .catch(this.handleError);
    } else if (method === 'PUT') {
      return this._http
        .put(url, body, { headers: headers })
        .toPromise()
        .then(() => {
          this.openSnackBar(successMessage);
          return body;
        })
        .catch(this.handleError);
    } else if (method === 'DELETE') {
      return this._http.delete(url, { headers: headers })
        .toPromise()
        .then(() => {
          this.openSnackBar(successMessage);
          return null;
        })
        .catch(this.handleError);
    }
  }

  openSnackBar(message: string, action = 'close') {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

}


  // sendRequest(options, callback) {
  //   let url: string;
  //   if (options.url) {
  //     url = options.url;
  //   } else {
  //     callback('Error url');
  //     return;
  //   }
  //   const method: string = options.method || 'GET';
  //   const body = options.body || {};
  //   const successMessage: string = options.successMessage || 'Success';
  //   const failMessage: string = options.failMessage || 'Fail';
  //   const xmlHttp = new XMLHttpRequest();

  //   xmlHttp.open(method, url, true);
  //   xmlHttp.setRequestHeader('Content-Type', 'application/json');
  //   xmlHttp.send(JSON.stringify(body));

  //   xmlHttp.onreadystatechange = () => {
  //     if (xmlHttp.readyState === 4) {
  //       if (xmlHttp.status === 200) {
  //         this.openSnackBar(successMessage);
  //         callback(xmlHttp.responseText);
  //       } else if (xmlHttp.status >= 500) {
  //         this.openSnackBar(failMessage);
  //         callback(xmlHttp.responseText);
  //       } else if (xmlHttp.status === 404) {
  //         this.openSnackBar(failMessage);
  //         callback(xmlHttp.responseText);
  //       } else if (xmlHttp.status >= 403) {
  //         this.openSnackBar(failMessage);
  //         callback(xmlHttp.responseText);
  //       } else if (xmlHttp.status >= 400) {
  //         this.openSnackBar(failMessage);
  //         callback(xmlHttp.responseText);
  //       }
  //     }
  //   };
  // }
