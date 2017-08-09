import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { IHttpReq } from '../models/http-req';
import { ToastrService } from './toastr.service';
// import { FormsModule } from '@angular/forms';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import { Router } from '@angular/router';

@Injectable()
export class HttpService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    public failMessage = 'Fail';

    constructor(private _http: Http, public toastrService: ToastrService, private _router: Router) { }

    private handleError = (error: any): Promise<any> => {
        if (error && error.status === 401) {
            this._router.navigate(['/login']);
        }
        this.toastrService.showMessage('error', error.message, this.failMessage);
        return error;
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
                    this.toastrService.showMessage('success', null, successMessage);
                    return response.json();
                })
                .catch(this.handleError);
        } else if (method === 'POST') {
            return this._http
                .post(url, body, { headers: headers })
                .toPromise()
                .then(response => {
                    this.toastrService.showMessage('success', null, successMessage);
                    return response.json();
                })
                .catch(this.handleError);
        } else if (method === 'PUT') {
            return this._http
                .put(url, body, { headers: headers })
                .toPromise()
                .then(() => {
                    this.toastrService.showMessage('success', null, successMessage);
                    return body;
                })
                .catch(this.handleError);
        } else if (method === 'DELETE') {
            return this._http.delete(url, { headers: headers })
                .toPromise()
                .then(() => {
                    this.toastrService.showMessage('success', null, successMessage);
                    return null;
                })
                .catch(this.handleError);
        }
    }
}
