import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Headers, Http } from '@angular/http';
import { IHttpReq } from '../models/http-req';
// import { FormsModule } from '@angular/forms';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HttpService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  public failMessage = 'Fail';

  constructor(private _http: Http, private snackBar: MdSnackBar) { }

  private handleError = (error: any): Promise<any> => {
    this.openSnackBar(this.failMessage);
    return (error.message || error);
  }

  public sendRequest(options: IHttpReq): Promise<any> {
    let url: string;
    if (!options.url) {
      return Promise.reject('Url required');
    } else {
      url = options.url;
    }
    const method = options.method || 'GET';
    const body = options.body || {};
    const successMessage: string = options.successMessage || 'Success';
    this.failMessage = options.failMessage || this.failMessage;
    const headers = options.headers || this.headers;

    if (method === 'GET') {
      return this._http.get(url)
        .toPromise()
        .then(response => {
          this.openSnackBar(successMessage);
          return response.json();
        })
        .catch(this.handleError);
    } else if (method === 'POST') {
      return this._http
        .post(url, body, { headers: headers })
        .toPromise()
        .then(response => {
          this.openSnackBar(successMessage);
          return response.json();
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

  private openSnackBar(message: string, action = 'Close') {
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
