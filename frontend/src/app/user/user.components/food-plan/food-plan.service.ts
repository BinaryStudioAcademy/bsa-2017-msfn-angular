import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FoodPlanService {
    private subject = new Subject<any>();

    constructor(
        private httpService: HttpService,
    ) { }

    getFoodTypes(callback): void {
        const request: IHttpReq = {
            url: 'api/food-type',
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request)
            .then(data => {
                callback(data);
            });
    }

    getFood(callback): void {
        const request: IHttpReq = {
            url: 'api/food',
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request)
            .then(data => {
                callback(data);
            });
    }

    sortData(data, key, direction) {
        return data.sort((a, b) => {
            let propA = '';
            let propB = '';

            switch (key) {
                case 'name':
                    [propA, propB] = [a.name, b.name];
                    break;
                case 'vendor':
                    [propA, propB] = [a.vendor, b.vendor];
                    break;
            }

            const valueA = isNaN(+propA) ? propA : +propA;
            const valueB = isNaN(+propA) ? propB : +propB;

            return (valueA < valueB ? -1 : 1) * (direction === 'asc' ? 1 : -1);
        });
    }

    sendProductList(data: object) {
        this.subject.next({ data: data });
    }

    getProductList(): Observable<any> {
        return this.subject.asObservable();
    }
    clearMessage() {
        this.subject.next();
    }

    save(foodPlan, method) {
        const request: IHttpReq = {
            url: '/api/user/food-list/add',
            method: method,
            body: foodPlan,
            successMessage: 'Added'
        };
        this.httpService.sendRequest(request);
    }
}
