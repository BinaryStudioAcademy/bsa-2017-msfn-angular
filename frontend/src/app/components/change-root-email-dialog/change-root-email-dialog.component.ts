import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { IHttpReq } from '../../models/http-req';

@Component({
  selector: 'app-change-root-email-dialog',
  templateUrl: './change-root-email-dialog.component.html',
  styleUrls: ['./change-root-email-dialog.component.scss']
})
export class ChangeRootEmailDialogComponent implements OnInit {

  token: string;
  info: string;


  constructor(private dialogRef: MdDialogRef<ChangeRootEmailDialogComponent>,
      private httpService: HttpService, @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.sendMail();
  }

  sendMail() {
    const request: IHttpReq = {
        url: '/api/user/changemail/',
        method: 'POST',
        body: {
          email: this.data.email,
          newRootMail: this.data.newRootEmail
        },
        successMessage: 'Letter with confirmation sent to email',
        failMessage: 'Failed to send confirmation letter'
    };

    this.httpService.sendRequest(request);
  }

  checkCode() {
    const request: IHttpReq = {
        url: '/api/user/changemail/' + this.token,
        method: 'GET',
        body: '',
        successMessage: 'Root email succesfully changed!',
        failMessage: 'Failed to change root email'
    };
    this.httpService.sendRequest(request).then(res => {
        if (res.status === 'ok') {
          this.dialogRef.close(res);
          return;
        }
    }).catch(err => {
        this.info = 'this confirmation code is wrong or has expired';
    });
  }

  resend() {
    this.sendMail();
  }

}
