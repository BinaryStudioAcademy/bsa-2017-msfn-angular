import { Injectable } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';
import { FinishDialogComponent } from './active-training.components/finish-dialog/finish-dialog.component';
import { ChooseTrainDialogComponent } from './active-training.components/choose-train-dialog/choose-train-dialog.component';

@Injectable()

export class ActiveTrainingService {

    dialogRef: MdDialogRef<any>;

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

        this.httpService.sendRequest(sendData)
            .then(data => {
                this.dialogRef = this.dialog.open(ChooseTrainDialogComponent, { data: data });
                this.dialogRef.afterClosed().subscribe(callback);
        });
    }

    showFinishDialog(data, callback) {
        this.dialogRef = this.dialog.open(FinishDialogComponent, { data: data });
        this.dialogRef.afterClosed().subscribe(callback);
    }
}
