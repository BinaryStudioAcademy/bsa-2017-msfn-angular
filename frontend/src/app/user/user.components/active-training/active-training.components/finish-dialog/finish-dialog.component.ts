import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { MdDialogRef } from '@angular/material';
import {MD_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'app-finish-dialog',
    templateUrl: './finish-dialog.component.html',
    styleUrls: ['./finish-dialog.component.scss'],
})
export class FinishDialogComponent implements OnInit {

    constructor(
        public dialogRef: MdDialogRef<any>,
    ) { }

    ngOnInit() {}

}

