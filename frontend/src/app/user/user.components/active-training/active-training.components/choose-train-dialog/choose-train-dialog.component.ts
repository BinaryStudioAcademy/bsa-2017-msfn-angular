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

    matchedTrain = [];
    constructor(
        @Inject(MD_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() {
        const day = new Date().getDay();
        this.data.forEach(element => {
            if (element.days && element.days.length) {
                element.days.forEach(el => {
                    if (+el.key === day) {
                        this.matchedTrain.push(element);
                    }
                });
            }
        });
    }
}

