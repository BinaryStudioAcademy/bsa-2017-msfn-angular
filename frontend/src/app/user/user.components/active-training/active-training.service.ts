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

    getMeasures(callback) {
        const sendData: IHttpReq = {
            url: '/api/user/me',
            method: 'GET',
            body: {},
        };

        this.httpService.sendRequest(sendData).then(data => {
            callback(data.settings);
        });
    }


    addTraining(plan, callback) {
        delete plan._id;
        delete plan.count;
        delete plan.days;
        plan.startDate = new Date().toISOString();
        const sendData: IHttpReq = {
            url: '/api/launchedtraining',
            method: 'POST',
            body: plan,
        };

        this.httpService.sendRequest(sendData)
            .then(data => {
            callback(data);
        });
    }

    updateTraining(plan, final?) {
        if (final) {
            plan.results = final;
        }
        const sendData: IHttpReq = {
            url: '/api/launchedtraining',
            method: 'PUT',
            body: plan,
        };
        this.httpService.sendRequest(sendData);
    }

    showFinishDialog(data, plan, callback) {
        this.dialogRef = this.dialog.open(FinishDialogComponent, { data: data });
        this.dialogRef.afterClosed().subscribe((dialogRes) => {
            if (dialogRes === true) {
                this.updateTraining(plan, data);
            }
            callback(dialogRes);
        });
    }
}
