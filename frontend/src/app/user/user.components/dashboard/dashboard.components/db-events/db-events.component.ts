import { Component, OnInit } from '@angular/core';
import { DateService } from '../../../../../services/date.service';

@Component({
    selector: 'app-db-events',
    templateUrl: './db-events.component.html',
    styleUrls: [
        './db-events.component.scss',
        '../../dashboard.component.scss'
    ],
    providers: [DateService]
})
export class DbEventsComponent implements OnInit {

    constructor(private dateService: DateService) { }

    title = 'Planned Events';
    interval = {
        startDate: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7),
        endDate: new Date()
    };

    selEvent: string;

    events = [
        {
            date: '2017-08-20T09:00:00.412Z',
            value: 'Running across Central Park',
            timestamp: null
        },
        {
            date: '2017-08-21T13:00:00.000Z',
            value: 'Swimming',
            timestamp: null
        },
        {
            date: '2017-08-21T07:00:00.000Z',
            value: 'Pull-ups & Push-ups',
            timestamp: null
        },
        {
            date: '2017-08-24T09:00:00.000Z',
            value: 'Running down the street',
            timestamp: null
        },
        {
            date: '2017-08-25T11:00:00.000Z',
            value: 'Pull-ups & Push-ups',
            timestamp: null
        },
        {
            date: '2017-08-26T15:30:00.000Z',
            value: 'Lifting weights',
            timestamp: null
        },
        {
            date: '2017-08-28T07:30:00.000Z',
            value: 'Marathon training',
            timestamp: null
        }
    ];

    processDates = this.initProcessDates();

    selectedEvents: any[];

    ngOnInit() {
        this.processDates();
    }

    initProcessDates() {
        for (const event of this.events) {
            const eventDateObject = new Date(event.date);
            event.timestamp = eventDateObject.getTime();
        }

        return () => {
            const startDateObject = new Date(this.interval.startDate),
                endDateObject = new Date(this.interval.endDate);

            if (startDateObject && endDateObject) {
                const startTimeStamp = startDateObject.getTime(),
                    endTimeStamp = endDateObject.getTime();

                this.selectedEvents = this.events.filter(event => {
                    return event.timestamp >= startTimeStamp && event.timestamp <= endTimeStamp + 86400000;
                });

                this.getDateString(this.selectedEvents);
            }
        };
    }

    getDateString(items) {
        for (const item of items) {
            const dateObject = this.dateService.convertDateFromIso(item.date);
            item.dateOutput = this.dateService.convertDateToIso(dateObject, true);
        }
    }
}
