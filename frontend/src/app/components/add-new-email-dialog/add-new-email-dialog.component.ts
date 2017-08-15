import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialog } from '@angular/material';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-add-new-email-dialog',
  templateUrl: './add-new-email-dialog.component.html',
  styleUrls: ['./add-new-email-dialog.component.scss']
})
export class AddNewEmailDialogComponent implements OnInit {

  email: string;
  emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.emailPattern)
  ]);

  constructor() { }

  ngOnInit() {
  }



}
