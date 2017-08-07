import { Injectable } from '@angular/core';

@Injectable()
export class RegistrationService {
  months = [
    {
      name: 'January', duration: 31
    },
    {
      name: 'February', duration: 28
    },
    {
      name: 'March', duration: 31
    },
    {
      name: 'April', duration: 30
    },
    {
      name: 'May', duration: 31
    },
    {
      name: 'June', duration: 30
    },
    {
      name: 'July', duration: 31
    },
    {
      name: 'August', duration: 31
    },
    {
      name: 'September', duration: 30
    },
    {
      name: 'October', duration: 31
    },
    {
      name: 'November', duration: 30
    },
    {
      name: 'December', duration: 31
    }
  ];

  generateDays(selMonth: string, selYear: number): number[] {
    const daysOutput = [];
    let monthLength;

    if (selMonth === 'February' &&
        (selYear % 4 === 0 && selYear % 100 !== 0 || selYear % 400 === 0)) {
      monthLength = 29;
    } else {
      for (const month of this.months) {
        if (selMonth === month.name) {
          monthLength = month.duration;
        }
      }
    }

    for (let i = 1; i <= monthLength; i++) {
      daysOutput.push(i);
    }
    return daysOutput;
  }

  generateMonths(): string[] {
    const monthsOutput = [];
    for (const month of this.months) {
      monthsOutput.push(month.name);
    }
    return monthsOutput;
  }

  generateYears(): number[] {
    const yearsOutput = [];
    const date = new Date();
    const currentYear = date.getFullYear();
    for (let i = 1900; i <= currentYear; i++) {
      yearsOutput.unshift(i);
    }
    return yearsOutput;
  }

  checkYear(year: number): boolean {
    let yearError = false;
    const date = new Date();
    const currentYear = date.getFullYear();
    yearError = currentYear - year < 18;

    return yearError;
  }

  constructor() { }
}
