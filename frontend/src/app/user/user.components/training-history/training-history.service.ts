import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';
import { WindowObj } from '../../../services/window.service';

@Injectable()
export class TrainingHistoryService {

    userId = (this.window.data._injectedData as any).userId;

    constructor(
        private httpService: HttpService,
        private window: WindowObj,
    ) { }

    getLaunchedTrainings(callback) {
        const sendData: IHttpReq = {
            url: '/api/launchedtraining/user/' + this.userId,
            method: 'GET',
            body: {},
        };

        this.httpService.sendRequest(sendData)
            .then(data => {
                callback(data);
        });
    }

    sortData(data, column, direction) {
        return data.sort((a, b) => {
            let propA = '',
                    propB = '';

            switch (column) {
                case 'name':
                    [propA, propB] = [a.name.toLowerCase(), b.name.toLowerCase()];
                    break;
                case 'type':
                    [propA, propB] = [a.type.toLowerCase(), b.type.toLowerCase()];
                    break;
                case 'date':
                    [propA, propB] = [a.date.raw, b.date.raw];
                    break;
                case 'totalTime':
                    [propA, propB] = [a.totalTime.seconds, b.totalTime.seconds];
                    break;
                case 'calories':
                    [propA, propB] = [a.calories, b.calories];
                    break;
            }

            const valueA = isNaN(+propA) ? propA : +propA;
            const valueB = isNaN(+propA) ? propB : +propB;

            return (valueA < valueB ? -1 : 1) * (direction === 'asc' ? 1 : -1);
        });
    }

    beautifyDate(date): string {
        const d = new Date(date);
        return this.addZeroToNum(d.getDate()) + '.' +
               this.addZeroToNum(d.getMonth() + 1) + '.' +
               d.getFullYear();
    }

    private addZeroToNum(num: number): string {
        if (num < 10) {
            return '0' + num;
        } else {
            return num.toString();
        }
    }

    getSeconds(string) {
        const arr = string.split(':');
        return Number(arr[2]) + Number(arr[1]) * 60 + Number(arr[0]) * 3600;
    }
}
