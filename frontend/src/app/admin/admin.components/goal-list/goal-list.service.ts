import { Injectable } from '@angular/core';
import { IHttpReq } from '../../../models/http-req';
import { HttpService } from '../../../services/http.service';
@Injectable()
export class GoalListService {

    constructor(public httpService: HttpService) { }

    createGoal(body: any, callback) {
        const request: IHttpReq = {
            url: '/api/goal',
            method: 'POST',
            body: {
                name: body.name,
                category: body.category
            }
        };
        this.httpService.sendRequest(request).then(data => {
            callback(data);
        }).catch(() => {});
    }

    getGoals(callback) {
        const request: IHttpReq = {
            url: '/api/goal',
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request).then(data => {
            callback(data);
        });
    }


    getGoalTypes(callback) {
        const request: IHttpReq = {
            url: '/api/goal-type',
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request).then(data => {
            callback(data);
        });
    }

    deleteGoal(id: number, callback) {
        const request: IHttpReq = {
            url: '/api/goal/' + id.toString(),
            method: 'DELETE',
            body: {}
        };

        this.httpService.sendRequest(request).then(data => {
            callback(data);
        });
    }

    updateGoal(id, body, callback) {
        body = Object.assign(body, {id: id});
        const request: IHttpReq = {
            url: '/api/goal',
            method: 'PUT',
            body: body
        };
        this.httpService.sendRequest(request).then(data => {
            callback(data);
        }).catch(() => {});
    }
}
