import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { FinishDialogComponent } from './active-training.components/finish-dialog/finish-dialog.component';

@Component({
    selector: 'app-active-training',
    templateUrl: 'active-training.component.html',
    styleUrls: ['active-training.component.scss']
})
export class ActiveTrainingComponent {
    finishTrain: boolean;
    burnedCallories = 1445;
    time: any = {
        total: '00:00:00:000',
        warming: '00:00:00:000'
    };
    dialogRef: MdDialogRef<any>;

    constructor(
        private dialog: MdDialog
    ) {}

    onFinish(timeData, callback) {
        this.dialogRef = this.dialog.open(FinishDialogComponent, {
            data: {
                time: timeData,
                calories: this.burnedCallories,
            }
        });

        this.dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.finishTrain = true;
            }
            setTimeout(() => { this.finishTrain = false; }, 1000);
        });
    }

}
