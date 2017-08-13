import {Component, OnInit} from '@angular/core';
import {GCalendarService} from '../../services/gcalendar.service';

@Component({
    selector: 'app-google-test',
    templateUrl: './google-test.component.html',
    styleUrls: ['./google-test.component.scss']
})
export class GoogleTestComponent implements OnInit {

    public gcalendar = new GCalendarService();

    constructor() {
    }

    ngOnInit() {
    }

    auth() {
        this.gcalendar.signIn();
    }

    status() {
        console.log(this.gcalendar.authorized);
    }

    calendards() {
        this.gcalendar.getCalendars(
            (err, result) => {
                if (err) {
                    console.error(err);
                    return;
                }

                console.log(result);
            }
        );
    }

    events() {
        this.gcalendar.getEvents(
            (err, result) => {
                if (err) {
                    console.error(err);
                    return;
                }

                console.log(result);
            }
        );
    }

    add() {
        const timeStart = new Date();
        const timeEnd = new Date(Date.now() + 60 * 60 * 1000);
        const data = {
            summary: 'New event',
            description: 'It`s workout time',
            start: {
                dateTime: this.gcalendar.makeDate(timeStart),
                timeZone: this.gcalendar.getTimeZone()
            },
            end: {
                dateTime: this.gcalendar.makeDate(timeEnd),
                timeZone: this.gcalendar.getTimeZone()
            }
        };
        this.gcalendar.addEvent(data,
            (err, result) => {
                console.log(result);
                console.log(err);
            }
        );
    }

    update() {
        const timeStart = new Date();
        const timeEnd = new Date(Date.now() + 60 * 60 * 1000);
        const data = {
            summary: 'New even123t',
            description: 'It`s workout tim123521e',
            start: {
                dateTime: this.gcalendar.makeDate(timeStart),
                timeZone: this.gcalendar.getTimeZone()
            },
            end: {
                dateTime: this.gcalendar.makeDate(timeEnd),
                timeZone: this.gcalendar.getTimeZone()
            }
        };
        this.gcalendar.updateEvent('mevorf27m22mihjgm3lfv7tg3o', data,
            (err, result) => {
                console.log(result);
                console.log(err);
            }
        );
    }

    quickAdd() {
        this.gcalendar.quickAddEvent('test', (err, res) => {
            console.log(err);
            console.log(res);
        });
    }

    delete() {
        this.gcalendar.deleteEvent('gum33998je4r9nr453sd89iig8', (err, res) => {
            console.log(err);
            console.log(res);
        });
    }
}
