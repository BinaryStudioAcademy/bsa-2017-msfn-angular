import { Injectable } from '@angular/core';
import { IHttpReq } from '../../../models/http-req';
import { HttpService } from '../../../services/http.service';
@Injectable()
export class ExerciseTypeService {

    constructor(public httpService: HttpService) { }



    addExerciseType(name: string, callback) {
        const request: IHttpReq = {
            url: '/api/exercise-type',
            method: 'POST',
            body: {
                name: name
            }
        };
        this.httpService.sendRequest(request).then(data => {
            callback(data);
        });
    }




    getAllExerciseTypes(callback) {
        const request: IHttpReq = {
            url: '/api/exercise-type',
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request).then(data => {
            callback(data);
        });
    }





    deleteExerciseTypeByCode(code: number, callback) {
        const request: IHttpReq = {
            url: '/api/exercise-type/' + code.toString(),
            method: 'DELETE',
            body: {}
        };

        this.httpService.sendRequest(request).then(data => {
            callback(data);
        });
    }






    updateExerciseTypeByCode(code: number, body, callback) {
        body = Object.assign(body, {code: code});
        const request: IHttpReq = {
            url: '/api/exercise-type',
            method: 'PUT',
            body: body
        };
        this.httpService.sendRequest(request).then(data => {
            callback(data);
            // UPDATE COL AFTER UPDATING
        });
    }
}
