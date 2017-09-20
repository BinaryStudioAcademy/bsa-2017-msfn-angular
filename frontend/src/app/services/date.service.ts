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

    convertDateToIso(dateObject, getTime?: boolean) {
        let isoDate;
        if (dateObject instanceof Date) {
            isoDate = `${dateObject.getUTCFullYear()}/${dateObject.getUTCMonth() + 1}/${dateObject.getUTCDate()}`;
            if (getTime) {
                isoDate += this.getTimeString(dateObject.getHours(), dateObject.getMinutes());
            }
        } else {
            isoDate = `${dateObject.year}-${dateObject.month}-${dateObject.day}`;
            if (getTime) {
                isoDate += this.getTimeString(dateObject.hours, dateObject.minutes);
            }
        }
        return isoDate;
    }

    beautifyDate(date): string {  // 18.09.2017
        const d = new Date(date);
        return this.addZero(d.getDate()) + '.' +
               this.addZero(d.getMonth() + 1) + '.' +
               d.getFullYear();
    }

    getDateString(month: number, day: number): string {
        const monthOutput = this.addZero(month + 1),
            dayOutput = this.addZero(day);
        return `${monthOutput}/${dayOutput}`;
    }

    getTimeString(hours: number, minutes: number): string {
        const hourOutput = this.addZero(hours),
            minuteOutput = this.addZero(minutes);
        return ` ${hourOutput}:${minuteOutput}`;
    }

    convertDateFromIso(isoDate: string, stringMonth?: boolean) {
        if (isoDate === '') {
            return {
                year: '',
                month: '',
                day: '',
                hours: '',
                minutes: ''
            };
        }
        const date = new Date(isoDate);

        let month: string | number = date.getMonth() + 1;
        month = stringMonth ? this.months[date.getMonth()].name : month;

        const dateProps = {
            year: date.getFullYear(),
            month: month,
            day: date.getDate(),
            hours: date.getUTCHours(),
            minutes: date.getUTCMinutes()
        };
        return dateProps;
    }

    updateDateTime(dateObject: Date, timeObject) {
        const dateString = this.convertDateToIso(dateObject);
        return new Date(`${dateString} ${timeObject.hours}:${timeObject.minutes}`);
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

    addZero(amount: number | string): string | number {
        if (amount < 10 && amount.toString().length < 2) {
            amount = '0' + amount;
        }
        return amount;
    }
}
