import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-choose-train-dialog',
    templateUrl: './choose-train-dialog.component.html',
    styleUrls: ['./choose-train-dialog.component.scss'],
})
export class ChooseTrainDialogComponent implements OnInit {

    matchedTrain: any;
    constructor(
        @Inject(MD_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() {
        const day = new Date().getDay();
        this.data.forEach(element => {
            if (element.key = day) {
                this.matchedTrain = element;
            }
        });
    }

}

