import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { IHttpReq } from '../models/http-req';
import { ToasterService } from './toastr.service';
// import { FormsModule } from '@angular/forms';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';

@Injectable()
export class HttpService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private failMessage = 'Fail';

    constructor(private _http: Http, private toastrService: ToasterService, private _router: Router) { }

    private handleError = (error: any): Promise<any> => {
        if (error && error.status === 401 && error.url.indexOf('/api/login') === -1) {
            this._router.navigate(['/']);
        }
        let message = error && error._body ? JSON.parse(error._body).error : '';
        if (!message) {
            message = 'Request failed';
        }

        this.toastrService.showMessage('error', message, this.failMessage);
        return error;
    }

    public sendRequest(options: IHttpReq): Promise<any> {
        let url: string;
        let promise = null;

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
            promise = this._http.get(url)
                .toPromise();
        } else if (method === 'POST') {
                promise =  this._http
                .post(url, body, { headers: headers })
                .toPromise();
        } else if (method === 'PUT') {
            promise =  this._http
                .put(url, body, { headers: headers })
                .toPromise();
        } else if (method === 'DELETE') {
            promise =  this._http.delete(url, { headers: headers })
                .toPromise();
        }

        return new Promise((resolve, reject) => {
            promise
                .then(() => {
                    resolve();
                    if (options.successMessage) {
                        this.toastrService.showMessage('success', null, successMessage);
                    }
                    return null;
                })
                .catch((err) => {
                    reject();
                    this.handleError(err);
                });
        });
    }
}
