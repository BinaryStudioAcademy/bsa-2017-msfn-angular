import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';

@Injectable()
export class ExerciseCreateService {

    constructor(private httpService: HttpService) { }

    getExerciseTypes(callback): void {
        const request: IHttpReq = {
            url: '/api/exercise-type/',
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request)
            .then(data => {
                callback(data);
        });
    }

    getExerciseById(id, callback): void {
        const request: IHttpReq = {
            url: '/api/exercise/' + id,
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request)
            .then(data => {
                callback(data);
        });
    }

    sendExercise(exerciseForm) {
        const request: IHttpReq = {
            url: '/api/exercise/',
            method: 'POST',
            body: {
                name: exerciseForm.name,
                type: exerciseForm.type,
                description: exerciseForm.description,
                // sportsId: exerciseForm.sportsId
            },
            successMessage: 'Added'
        };
        this.httpService.sendRequest(request);
    }

    updateExercise(id, exerciseForm) {
        const request: IHttpReq = {
            url: '/api/exercise/' + id,
            method: 'PUT',
            body: {
                name: exerciseForm.name,
                typeId: exerciseForm.typeId,
                description: exerciseForm.description,
                // sportsId: exerciseForm.sportsId
            },
            successMessage: 'Edited'
        };
        this.httpService.sendRequest(request);
    }
}
