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
                case 'data':
                    [propA, propB] = [a.data, b.data];
                    break;
                case 'totalTime':
                    [propA, propB] = [a.totalTime, b.totalTime];
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
        return d.getFullYear() + '.' +
         this.addZeroToNum(d.getMonth() + 1) + '.' +
         this.addZeroToNum(d.getDate()) + ' (' +
         this.addZeroToNum(d.getHours()) + ':' +
         this.addZeroToNum(d.getMinutes()) + ')';
    }

    private addZeroToNum(num: number): string {
        if (num < 10) {
            return '0' + num;
        } else {
            return num.toString();
        }
    }
}
