import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: [
    '../../../globalStyles/materialTheme.scss',
    './registration.component.scss'
  ],
  providers: [RegistrationService]
})

export class RegistrationComponent implements OnInit {
  userError = '';
  emailError = '';
  errors = {
    year: false,
    height: '',
    weight: ''
  };
  inputsValid = true;

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

  constructor(public router: Router, public registrationService: RegistrationService) { }

  setDayOptions(month, year): void {
    this.dayOptions = this.registrationService.generateDays(month, year);
  }

  setMonth() {
    this.setDayOptions(this.user.month, this.user.year);
  }

  setYear() {
    this.setDayOptions(this.user.month, this.user.year);
  }

  setGender(e) {
    this.user.gender = e.checked ? 'Female' : 'Male';
  }

  register(form): void {
    if (form.valid) {
      this.errors = this.registrationService.checkInputs(
        this.user.year, this.user.height, this.user.weight
      );
      this.inputsValid = true;
      for (const i in this.errors) {
        this.inputsValid = !this.errors[i];
      }

      if (this.inputsValid) {
        const user = this.user;
        console.log(user);
      }

      // make a post request
    } else {
      this.userError = 'Please fill in all fields';
    }
  }

  ngOnInit() { }
}
