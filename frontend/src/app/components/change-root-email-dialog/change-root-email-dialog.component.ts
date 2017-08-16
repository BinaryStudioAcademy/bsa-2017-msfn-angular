import { Component, OnInit } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialog } from '@angular/material';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-change-root-email-dialog',
  templateUrl: './change-root-email-dialog.component.html',
  styleUrls: ['./change-root-email-dialog.component.scss']
})
export class ChangeRootEmailDialogComponent implements OnInit {

  confirmation: string;

  constructor() { }

  ngOnInit() {
    this.sendMail();
  }

  sendMail() {

  }

  resend() {
    this.sendMail();
  }

}
