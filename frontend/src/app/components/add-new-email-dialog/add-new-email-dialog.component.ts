import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialog } from '@angular/material';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { ToasterService } from '../../services/toastr.service';
import { WindowObj } from '../../services/window.service';

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

  // MOCKED! TO CHANGE
  currentUserId = '';
  newSecondaryEmail = '';

  constructor(
    private httpHandler: HttpService,
    private toastrService: ToasterService,
    private window: WindowObj
  ) { }

  ngOnInit() {
    // MOCKED! TO CHANGE to something like window.userId
    this.currentUserId = '12345';
  }

  sendNewSecondaryEmail() {
    const request = {
      url: '/api/user/secondaryEmails/' + this.currentUserId,
      method: 'PUT',
      body: {
        newSecondaryEmail: this.newSecondaryEmail
      },
      failMessage: 'New email added',
      successMessage: 'Email not added'
    };

    // TO FIX
    // this.httpHandler.sendRequest(request);
  }

}
