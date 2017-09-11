import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';

@Injectable()
export class ExerciseListService {
    constructor(private httpService: HttpService) { }

    getExercises(callback): void {
        const request: IHttpReq = {
            url: '/api/exercise',
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request)
            .then(data => {
                data.forEach(element => {
                    element.category = element.category.name;
                });
                callback(data);
        });
    }

    sortData(data, column, direction) {
        return data.sort((a, b) => {
            let propA = '';
            let propB = '';

            switch (column) {
                case 'name':
                    [propA, propB] = [a.name, b.name];
                    break;
                case 'category':
                    [propA, propB] = [a.category, b.category];
                    break;
            }

            const valueA = isNaN(+propA) ? propA : +propA;
            const valueB = isNaN(+propA) ? propB : +propB;

            return (valueA < valueB ? -1 : 1) * (direction === 'asc' ? 1 : -1);
        });
    }
}
