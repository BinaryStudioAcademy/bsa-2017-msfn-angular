import { Injectable } from '@angular/core';

@Injectable()
export class ProfileService {
  months = [
    {
      value: 'January', viewValue: 'January'
    },
    {
      value: 'February', viewValue: 'February'
    },
    {
      value: 'March', viewValue: 'March'
    },
    {
      value: 'April', viewValue: 'April'
    },
    {
      value: 'May', viewValue: 'May'
    },
    {
      value: 'June', viewValue: 'June'
    },
    {
      value: 'July', viewValue: 'July'
    },
    {
      value: 'August', viewValue: 'August'
    },
    {
      value: 'September', viewValue: 'September'
    },
    {
      value: 'October', viewValue: 'October'
    },
    {
      value: 'November', viewValue: 'November'
    },
    {
      value: 'December', viewValue: 'December'
    }
  ];
  constructor() { }

  getMonth() {
    return this.months;
  }
  getDays() {
    const days = [];
    for (let i = 1; i < 32; i++) {
      days.push(i);
    }
    return days;
  }

   getYears(): number[] {
    const years = [];
    const date = new Date();
    const currentYear = date.getFullYear();
    for (let i = 1990; i <= currentYear; i++) {
      years.unshift(i);
    }
    return years;
  }

}
