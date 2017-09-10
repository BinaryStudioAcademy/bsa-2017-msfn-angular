import { Injectable } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class TrainingHistoryDetailService {

    constructor(
        private httpService: HttpService,
        public router: ActivatedRoute,
    ) { }

    getLaunchedTraining(callback) {
        const sendData: IHttpReq = {
            url: '/api/launchedtraining/' + this.router.snapshot.params.id,
            method: 'GET',
            body: {},
        };

        this.httpService.sendRequest(sendData)
            .then(data => {
                callback(data);
            });
    }

    beautifyDate(date): string {
        const d = new Date(date);
        return this.addZeroToNum(d.getDate()) + '.' +
            this.addZeroToNum(d.getMonth() + 1) + '.' +
            d.getFullYear() + ' ( ' +
            this.addZeroToNum(d.getHours()) + ':' +
            this.addZeroToNum(d.getMinutes()) + ' )';
    }

    private addZeroToNum(num: number): string {
        if (num < 10) {
            return '0' + num;
        } else {
            return num.toString();
        }
    }

}
