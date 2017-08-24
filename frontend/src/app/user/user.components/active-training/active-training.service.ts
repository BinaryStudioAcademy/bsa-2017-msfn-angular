import { Injectable } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';
import { FinishDialogComponent } from './active-training.components/finish-dialog/finish-dialog.component';
import { ChooseTrainDialogComponent } from './active-training.components/choose-train-dialog/choose-train-dialog.component';

@Injectable()

export class ActiveTrainingService {

    dialogRef: MdDialogRef<any>;
    fakeData = [{
        _id: 'firstIDduisvh98s4',
        name: 'Intensive gym',
        days: [{key: 0, value: 'Sun', checked: true}, {key: 3, value: 'Wed', checked: true}]
    },
    {
        _id: 'secondIDduisvh98s4',
        name: 'Crossing',
        days: [{key: 1, value: 'Mon', checked: true}]
    }];

    constructor(
        private dialog: MdDialog,
        private httpService: HttpService
    ) {}

    getPlans(callback) {
        const sendData: IHttpReq = {
            url: '/api/training-plan',
            method: 'GET',
            body: {},
        };

        // this.httpService.sendRequest(sendData)
        //     .then(data => {
        //         callback(data);
                this.dialogRef = this.dialog.open(ChooseTrainDialogComponent, { data: this.fakeData });
                this.dialogRef.afterClosed().subscribe();
        // });
    }

    showFinishDialog(data, callback) {
        this.dialogRef = this.dialog.open(FinishDialogComponent, { data: data });
        this.dialogRef.afterClosed().subscribe(callback);
    }
}
