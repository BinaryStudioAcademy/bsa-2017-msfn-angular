import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { EncryptService } from '../../services/encrypt.service';
import { IHttpReq } from '../../models/http-req';
import { HttpService } from '../../services/http.service';
import { ToasterService } from '../../services/toastr.service';
import { MdDialogRef } from '@angular/material';

@Component({
    selector: 'app-confirm-password-dialog',
    templateUrl: './confirm-password-dialog.component.html',
    styleUrls: ['./confirm-password-dialog.component.scss'],
})
export class ConfirmPasswordDialogComponent implements OnInit {
    passwordForm: FormGroup;
    password: string;

    currentPasswordFormControl = new FormControl('',
        [
            Validators.required,
            Validators.minLength(6)
        ]
    );

    constructor(
        private httpService: HttpService,
        private encryptor: EncryptService,
        private toastrService: ToasterService,
        public dialogRef: MdDialogRef<any>
    ) { }

    ngOnInit() {
        this.buildForm();
    }

    buildForm() {
        this.passwordForm = new FormGroup({
            newPassword: new FormControl('', [Validators.minLength(6), Validators.required]),
            newPasswordConfirmation: new FormControl('', [Validators.minLength(6), Validators.required]),
        }, this.passwordMatchValidator);
    }

    passwordMatchValidator(g: FormGroup) {
        return g.get('newPassword').value === g.get('newPasswordConfirmation').value
            ? null : {
                passwordMatchValidator: {
                    'mismatch': true
                }
            };
    }

    onClick(controls) {
        if (controls.newPassword === controls.newPasswordConfirmation) {
            this.chengePassword(controls);
        } else {
            this.toastrService.showMessage('error', 'Passwords doesn`t match', 'Oh, sorry!');
        }
    }

    chengePassword(controls) {
        const encData = this.encryptor.encrypt({
            'password': this.password,
            'newPassword': controls.newPassword
        });

        const sendData: IHttpReq = {
            url: '/api/change-password/',
            method: 'PUT',
            body: { data: encData },
            successMessage: 'Password has been changed!'
        };

        this.httpService.sendRequest(sendData).then(res => {
            if (res.data) {
                this.dialogRef.close();
            }
        });
    }
}

