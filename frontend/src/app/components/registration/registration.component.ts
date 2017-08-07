import { WindowObj } from './../../services/window.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from './registration.service';
import { HttpClient } from '@angular/common/http';

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

  constructor(private window: WindowObj,
       public router: Router, public registrationService: RegistrationService, private http: HttpClient) {
         console.log(this.window.data._injectedData);
        }

  setDayOptions(month: string, year: number): void {
    this.dayOptions = this.registrationService.generateDays(month, year);
  }

  setGender(e): void {
    this.user.gender = e.checked ? 'Female' : 'Male';
  }

  register(form: HTMLFormElement): void {
    if (form.valid) {
      this.errors = this.registrationService.checkInputs(
        this.user.year, this.user.height, this.user.weight
      );
      this.inputsValid = true;

      for (const i of Object.keys(this.errors)) {
        this.inputsValid = !this.errors[i];
        if (!this.inputsValid) {
          break;
        }
      }

      if (this.inputsValid) {
        this.userError = '';
        const user = this.user;

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
