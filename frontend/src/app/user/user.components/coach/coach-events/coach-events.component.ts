import { Component, Input, OnInit } from '@angular/core';
import { DateService } from '../../../../services/date.service';

@Component({
    selector: 'app-coach-events',
    templateUrl: './coach-events.component.html',
    styleUrls: [
        '../../dashboard/dashboard.components/db-events/db-events.component.scss',
        '../coach.component.scss',
        './coach-events.component.scss'
    ],
    providers: [DateService]
})
export class CoachEventsComponent implements OnInit {

    constructor(private dateService: DateService) { }

    @Input() userData;

    title = 'Planned Events';
    interval = {
        startDate: new Date,
        endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7)
    };

    events = [
        {
            date: '2017-09-04T09:00:00.412Z',
            value: 'Running across Central Park',
            timestamp: null
        },
        {
            date: '2017-09-08T07:00:00.000Z',
            value: 'Swimming',
            timestamp: null
        },
        {
            date: '2017-09-10T13:00:00.000Z',
            value: 'Pull-ups & Push-ups',
            timestamp: null
        },
        {
            date: '2017-09-11T09:00:00.000Z',
            value: 'Running down the street',
            timestamp: null
        },
        {
            date: '2017-09-11T11:00:00.000Z',
            value: 'Pull-ups & Push-ups',
            timestamp: null
        },
        {
            date: '2017-09-15T07:30:00.000Z',
            value: 'Lifting weights',
            timestamp: null
        },
        {
            date: '2017-09-15T15:30:00.000Z',
            value: 'Marathon training',
            timestamp: null
        }
    ];

    processDates = this.initProcessDates();

    selectedEvents: any[];
    selectedDates: any[];
    eventOutput: any[];

    ngOnInit() {
        this.processDates();
    }

    initProcessDates() {
        for (const event of this.events) {
            const eventDateObject = new Date(event.date);
            event.timestamp = eventDateObject.getTime();
        }

        return () => {
            this.eventOutput = [];

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
        this.selectedDates = [];

        for (const item of items) {
            let dateExists = false;
            const d = new Date(item.date);
            const dateString = this.dateService.getDateString(d.getUTCMonth(), d.getUTCDate());
            item.shortDate = dateString;

            for (const selDate of this.selectedDates) {
                if (selDate.dateOutput === dateString) {
                    dateExists = true;
                    break;
                }
            }

            if (!dateExists) {
                this.selectedDates.push({
                    date: item.date,
                    dateOutput: dateString,
                    checked: false
                });
            }
        }

        if (this.selectedDates.length > 0) {
            this.selectedDates[0].checked = true;
            this.getEventOutput(this.selectedDates[0].dateOutput);
        }
    }

    getEventOutput(option): void {
        for (const item of this.selectedDates) {
            item.checked = item.dateOutput === option;
        }

        this.eventOutput = this.selectedEvents.filter(item => {
            return item.shortDate === option;
        });

        for (const event of this.eventOutput) {
            const d = new Date(event.date);
            event.time = this.dateService.getTimeString(d.getUTCHours(), d.getUTCMinutes());
        }
    }
}
