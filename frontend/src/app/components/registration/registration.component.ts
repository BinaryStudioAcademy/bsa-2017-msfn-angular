import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from './registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [RegistrationService]
})

export class RegistrationComponent implements OnInit {
  buttonName = 'Register';
  userError = '';

  user = {
    gender: 'female',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    height: null,
    weight: null
  };

  selectedYear = 2017;
  selectedMonth = 'January';
  monthOptions = this.registrationService.generateMonths();
  yearOptions = this.registrationService.generateYears();
  dayOptions = this.registrationService.generateDays(this.selectedMonth, this.selectedYear);

  constructor(public router: Router, public registrationService: RegistrationService) { }

  setDayOptions(month, year): void {
    this.dayOptions = this.registrationService.generateDays(month, year);
  }

  setMonth(month) {
    this.selectedMonth = month;
    this.setDayOptions(this.selectedMonth, this.selectedYear);
  }

  setYear(year) {
    this.selectedYear = year;
    this.setDayOptions(this.selectedMonth, this.selectedYear);
  }

  ngOnInit() { }
}
