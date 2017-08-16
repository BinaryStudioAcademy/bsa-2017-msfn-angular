import { MdDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { IHttpReq } from '../../models/http-req';
import { Router } from '@angular/router';
import { EncryptService } from '../../services/encrypt.service';
import { IUser } from '../../models/user';
import { RegistrationService } from './registration.service';
import { DateService } from '../../services/date.service';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: [
        '../../../globalStyles/materialTheme.scss',
        './registration.component.scss'
    ],
    providers: [
        RegistrationService,
        DateService
    ]
})

export class RegistrationComponent {
    userError = '';
    yearError = false;

    userToPass: IUser;

    user = {
        gender: 'Male',
        email: '',
        firstName: '',
        lastName: '',
        height: '',
        weight: '',
        password: '',
        birthday: ''
    };

    birthday = {
        year: 2000,
        month: 'January',
        day: 1
    };

    monthOptions = this.dateService.generateMonths();
    yearOptions = this.dateService.generateYears();
    dayOptions = this.dateService.generateDays(
        this.birthday.month,
        this.birthday.year
    );

    emailPattern = /[\w0-9._%+-]+@[\w0-9.-]+\.[\w]{2,3}$/;
    requestSent = false;

    constructor(private httpService: HttpService,
                private router: Router,
                private encryptor: EncryptService,
                private registrationService: RegistrationService,
                private dateService: DateService,
                private _dialogRef: MdDialogRef<RegistrationComponent>) {
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
        this.dayOptions = this.dateService.generateDays(month, year);
    }

    register(): void {
        if (this.emailFormControl.valid &&
            this.firstNameFormControl.valid &&
            this.lastNameFormControl.valid &&
            this.heightFormControl.valid &&
            this.weightFormControl.valid &&
            this.passwordFormControl.valid) {

            this.userError = '';
            const monthNumber = this.monthOptions.indexOf(this.birthday.month) + 1;
            const birthday = this.dateService.convertDateToIso({
                year: this.birthday.year,
                month: monthNumber,
                day: this.birthday.day
            });

            this.requestSent = true;

            this.user.birthday = birthday;
            this.userToPass = Object.assign({}, this.user);
            this.userToPass.password = this.encryptor.encrypt({
                'password': this.userToPass.password
            });
            this.userToPass.email = this.encryptor.encrypt({
                'email': this.userToPass.email
            });
            const registerReq: IHttpReq = {
                url: '/api/user',
                method: 'POST',
                body: this.userToPass,
                failMessage: 'Registration failed:',
            };
            this.httpService.sendRequest(registerReq).then(() => {
                this._dialogRef.close();
            }).catch(() => {
                this.requestSent = false;
            });
        } else {
            this.userError = 'Please fill in all fields correctly';
        }
    }
}
