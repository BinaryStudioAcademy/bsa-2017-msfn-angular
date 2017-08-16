import {Injectable} from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {IHttpReq} from '../../../models/http-req';

@Injectable()
export class MeasureListService {
    constructor(private httpService: HttpService) { }

    getMeasures(callback): void {
        const request: IHttpReq = {
            url: '/api/measure-list',
            method: 'GET',
            body: {}
        };
        const measures = [
            {
                code: '1',
                name: 'm',
                type: 'length',
            },
            {
                code: '2',
                name: 'ton',
                type: 'weight',
            },
            {
                code: '3',
                name: 'lb',
                type: 'weight',
            },
            {
                code: '4',
                name: 'ft',
                type: 'length',
            }
        ];
        callback(measures);
    }
    /*addMeasure(name: string, type: string, callback): void {
        const request: IHttpReq = {
            url: '/api/measure-list',
            method: 'POST',
            body: {
                name,
                type,
            }
        };
        this.httpService.sendRequest(request)
            .then(
                data => callback(data)
            );
    }*/
    sortData(data, column, direction = 'asc' || 'desc') {
        return data.sort((a, b) => {
            let propA = '';
            let propB = '';
            switch (column) {
                case 'name': [propA, propB] = [a.name, b.name]; break;
                case 'type': [propA, propB] = [a.type, b.type]; break;
            }
            const valueA = isNaN(+propA) ? propA : +propA;
            const valueB = isNaN(+propA) ? propB : +propB;
            return (valueA < valueB ? -1 : 1) * (direction === 'asc' ? 1 : -1);
        });
    }
}
