import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from './registration.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';

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

  constructor(public router: Router, public registrationService: RegistrationService, private http: HttpClient) { }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.emailPattern)
  ]);

  firstNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2)
  ]);

  lastNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2)
  ]);

  heightFormControl = new FormControl('', [
    Validators.required,
    Validators.min(50),
    Validators.max(270)
  ]);

  weightFormControl = new FormControl('', [
    Validators.required,
    Validators.min(5),
    Validators.max(500)
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  setDayOptions(month: string, year: number): void {
    this.dayOptions = this.registrationService.generateDays(month, year);
  }

  setGender(e): void {
    this.user.gender = e.checked ? 'Female' : 'Male';
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

        const req = this.http.post('/api/user', user);
        req.subscribe(
          data => {},
          err => this.userError = err.statusText
        );
      }
    } else {
      this.userError = 'Please fill in all fields correctly';
    }
  }

  ngOnInit() { }
}
