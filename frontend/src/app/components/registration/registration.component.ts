import { Component, OnInit } from '@angular/core';
import { RegistrationService } from './registration.service';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { IHttpReq } from '../../models/http-req';
import { Router } from '@angular/router';
import { EncryptService } from '../../services/encrypt.service';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: [
        '../../../globalStyles/materialTheme.scss',
        './registration.component.scss'
    ],
    providers: [
        RegistrationService
    ]
})

export class RegistrationComponent implements OnInit {
    userError = '';
    yearError = false;

    user = {
        gender: 'Male',
        email: null,
        firstName: null,
        lastName: null,
        month: 'January',
        day: 1,
        year: 2000,
        height: null,
        weight: null,
        password: null,
    };

    monthOptions = this.registrationService.generateMonths();
    yearOptions = this.registrationService.generateYears();
    dayOptions = this.registrationService.generateDays(this.user.month, this.user.year);

    emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;

    constructor(private registrationService: RegistrationService,
                private httpService: HttpService,
                private router: Router,
                private encryptor: EncryptService) {
    }

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailPattern)
    ]);

    firstNameFormControl = new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
    ]);

    lastNameFormControl = new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
    ]);

    heightFormControl = new FormControl('', [
        Validators.required,
        Validators.min(100),
        Validators.max(300)
    ]);

    weightFormControl = new FormControl('', [
        Validators.required,
        Validators.min(30),
        Validators.max(300)
    ]);

    passwordFormControl = new FormControl('', [
        Validators.required,
        Validators.minLength(6)
    ]);

    setDayOptions(month: string, year: number): void {
        this.dayOptions = this.registrationService.generateDays(month, year);
    }

    register(): void {
        if (this.emailFormControl.valid &&
            this.firstNameFormControl.valid &&
            this.lastNameFormControl.valid &&
            this.heightFormControl.valid &&
            this.weightFormControl.valid &&
            this.passwordFormControl.valid) {
            this.yearError = this.registrationService.checkYear(this.user.year);

            if (!this.yearError) {
                this.userError = '';
                const user = this.user;
                console.log(user);
                const registerReq: IHttpReq = {
                    url: '/api/user',
                    method: 'POST',
                    body: user,
                    failMessage: 'You can\'t register now, sorry',
                };
                this.httpService.sendRequest(registerReq).then(data => {
                    console.log(data);
                    const encData = this.encryptor.encrypt({
                            'password': user.password,
                            'email': user.email
                        }),
                        sendData: IHttpReq = {
                            url: '/api/login',
                            method: 'POST',
                            body: {data: encData}
                        };

                    this.httpService.sendRequest(sendData)
                        .then((res) => {
                            if (res.access) {
                                location.reload();
                                this.router.navigate(['/profile']);
                            }
                        });
                });
            }
        } else {
            this.userError = 'Please fill in all fields correctly';
        }
    }

    ngOnInit() {
    }
}
