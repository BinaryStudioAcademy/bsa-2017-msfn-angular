import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { EncryptService } from '../../services/encrypt.service';
import { IHttpReq } from '../../models/http-req';
import { HttpService } from '../../services/http.service';
import { MD_DIALOG_DATA } from '@angular/material';
import { ToasterService } from '../../services/toastr.service';

@Component({
    selector: 'app-confirm-password-dialog',
    templateUrl: './confirm-password-dialog.component.html',
    styleUrls: ['./confirm-password-dialog.component.scss'],
})
export class ConfirmPasswordDialogComponent implements OnInit {
    passwordForm: FormGroup;
    password: string;
    email = this.data[0];
    id = this.data[1];

    currentPasswordFormControl = new FormControl('',
        [
            Validators.required,
            Validators.minLength(6)
        ]
    );

    constructor(
        @Inject(MD_DIALOG_DATA) public data: string[],
        private httpService: HttpService,
        private encryptor: EncryptService,
        private toastrService: ToasterService
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
            this.checkCurrentPassword(controls);
        } else {
            this.toastrService.showMessage('error', 'Passwords doesn`t match', 'Oh, sorry!');
        }
    }

    checkCurrentPassword(controls) {
        const encData = this.encryptor.encrypt({
            'password': this.password,
            'email': this.email
        });

        const sendData: IHttpReq = {
            url: '/api/login',
            method: 'POST',
            body: { data: encData }
        };

        this.httpService.sendRequest(sendData)
            .then((res) => {
                if (res.access === true) {
                    this.chengePassword(controls);
                    this.toastrService.showMessage('success', 'password has been changed', 'Success!');
                } else {
                    this.toastrService.showMessage('error', 'incorect current password', 'Oh, sorry!');
                }
            });
    }

    chengePassword(controls) {
        const password = this.encryptor.encrypt({
            'password': controls.newPassword
        });

        const sendData: IHttpReq = {
            url: '/api/user/' + this.id,
            method: 'PUT',
            body: { password: password }
        };

        this.httpService.sendRequest(sendData);
    }

}

