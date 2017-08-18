import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { EncryptService } from '../../services/encrypt.service';
import { IHttpReq } from '../../models/http-req';
import { HttpService } from '../../services/http.service';
import { WindowObj } from '../../services/window.service';

@Component({
    selector: 'app-login-dialog',
    templateUrl: './login-dialog.component.html',
    styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {
    EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    email: string;
    password: string;
    private verified = true;
    private sendedMail = false;

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern(this.EMAIL_REGEX)
    ]);

    passwordFormControl = new FormControl('', [
        Validators.required,
        Validators.minLength(6)
    ]);

    constructor(
        private encryptor: EncryptService,
        private httpHandler: HttpService,
        private router: Router,
        private window: WindowObj
    ) {}

    login() {
        const encData = this.encryptor.encrypt({
            'password': this.password,
            'email': this.email
        }),
            sendData: IHttpReq = {
                url: '/api/login',
                method: 'POST',
                body: {data: encData}
            };

        this.httpHandler.sendRequest(sendData)
            .then((res) => {
                if (res.access === true) {
                    location.reload();
                } else {
                    this.verified = false;
                }
            });
    }

    verify() {
        const encData = this.encryptor.encrypt({
            'email': this.email
        }),
            sendData: IHttpReq = {
                url: '/api/user/activate/resendactivation',
                method: 'POST',
                body: {data: encData},
                successMessage: 'Check your email'
            };

        this.httpHandler.sendRequest(sendData)
            .then((res) => {
                this.sendedMail = true;
            });
    }
}
