import { Injectable } from '@angular/core';

@Injectable()
export class DateService {

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

  constructor() { }

  convertDateToIso(dateObject) {
    const isoDate = `${dateObject.year}-${dateObject.month}-${dateObject.day}`;
    return isoDate;
  }

  convertDateFromIso(isoDate: string) {
    const date = new Date(isoDate);
    const dateProps = {
      year: date.getFullYear(),
      month: this.months[date.getMonth()].name,
      day: date.getDate()
    };

    return dateProps;
  }

  generateDays(selMonth: string, selYear: number): number[] {
    const daysOutput: number[] = [];
    let monthLength;

    if (selMonth === 'February' &&
      (selYear % 4 === 0 && selYear % 100 !== 0 || selYear % 400 === 0)) {
      monthLength = 29;
    } else {
      for (let i = 0; i < this.months.length; i++) {
        if (selMonth === this.months[i].name) {
          monthLength = this.months[i].duration;
        }
      }
    }

    for (let i = 1; i <= monthLength; i++) {
      daysOutput.push(i);
    }
    return daysOutput;
  }

  generateMonths(): string[] {
    const monthsOutput: string[] = [];
    for (const month of this.months) {
      monthsOutput.push(month.name);
    }
    return monthsOutput;
  }

  generateYears(): number[] {
    const yearsOutput = [];
    const date = new Date();
    const currentYear = date.getFullYear();
    for (let i = 1900; i <= currentYear - 14; i++) {
      yearsOutput.push(i);
    }
    return yearsOutput;
  }

}
