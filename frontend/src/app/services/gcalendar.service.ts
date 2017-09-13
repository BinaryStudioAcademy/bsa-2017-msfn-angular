import {Injectable} from '@angular/core';
import 'moment';
import * as moment from 'moment-timezone';
import {Subject} from 'rxjs/Subject';

declare const gapi: any;

@Injectable()
export class GCalendarService {

    private _clientId = '83981840514-r86m39o3uimhacsgcug75b08s48necae.apps.googleusercontent.com';
    private _docs = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
    private _apiUrl = 'https://www.googleapis.com/auth/calendar';
    public client: any;
    public authorized: boolean;
    public inited = false;

    public statusObservable: Subject<any> = new Subject();

    constructor() {
        gapi.load('client:auth2', () => {
            this.initClient();
        });
    }

    initClient() {
        gapi.client.init({
            discoveryDocs: this._docs,
            clientId: this._clientId,
            scope: this._apiUrl
        }).then(() => {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen((status) => {
                this.updateSigninStatus(status);
            });

            this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
    }

    updateSigninStatus(status) {
        this.authorized = status;
        this.inited = true;
        this.statusObservable.next(status);
    }

    checkAuthorized(callback) {
        if (this.authorized) {
            callback(null, true);
        } else {
            this.signIn().then((err, result) => {
                callback(err, result);
            });
        }
    }

    getEvents(callback) {
        gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'timeMin': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        }).then((response) => {
            const events = response.result.items;

            if (events.length > 0) {
                callback(null, events);
            } else {
                callback('no events');
            }
        });
    }

    getCalendars(callback) {
        gapi.client.calendar.calendarList.list().then((response) => {
            const events = response.result.items;

            if (events.length > 0) {
                callback(null, events);
            } else {
                callback('no calendars');
            }
        });
    }

    getEvent(id, callback) {
        gapi.client.calendar.events.get({
            calendarId: 'primary',
            eventId: id
        }).then(
            (response) => {
            callback(null, response);
            },
            (err) => {
                callback(err.result.error.message);
            }
        );
    }

    addEvent(data: object, callback) {
        /**
         * Events fields -
         * https://developers.google.com/google-apps/calendar/v3/reference/events?hl=ru#resource
        */
         // data = {
         //    'summary': 'Google I/O 2015',
            // 'location': '800 Howard St., San Francisco, CA 94103',
            // 'description': 'A chance to hear more about Google\'s developer products.',
            // 'start': {
            //     'dateTime': '2015-05-28T09:00:00-07:00',
            //     'timeZone': 'America/Los_Angeles'
            // },
            // 'end': {
            //     'dateTime': '2015-05-28T17:00:00-07:00',
            //     'timeZone': 'America/Los_Angeles'
            // },
            //
            // 'recurrence': [
            //     'RRULE:FREQ=DAILY;COUNT=2'
            // ],
            // Другие участники
            // 'attendees': [
            //     {'email': 'lpage@example.com'},
            //     {'email': 'sbrin@example.com'}
            // ],
            // 'reminders': {
            //     'useDefault': true,
                // 'overrides': [
                //     {'method': 'email', 'minutes': 24 * 60},
                //     {'method': 'popup', 'minutes': 10}
                // ]
            // }
        // };
        gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': data
        }).then(
            response => {
                callback(null, response);
            },
            err => {
                callback(err.result.error.message);
            }
        );
    }

    updateEvent(eventId: string, data: object, callback) {
        gapi.client.calendar.events.patch({
            calendarId: 'primary',
            eventId: eventId,
            resource: data
        }).then(
            response => {
                callback(null, response);
            },
            err => {
                callback(err.result.error.message);
            }
        );
    }

    quickAddEvent(text: string, callback) {
        gapi.client.calendar.events.quickAdd({
            calendarId: 'primary',
            text: text
        }).then(
            response => {
                callback(null, response);
            },
            err => {
                callback(err.result.error.message);
            }
        );
    }

    deleteEvent(id: string, callback) {
        gapi.client.calendar.events.delete(
            {
                calendarId: 'primary',
                eventId: id
            }
        ).then(
            response => {
                callback(null, response);
            },
            err => {
                callback(err.result.error.message);
            }
        );
    }

    /**
     *  Sign in the user upon button click.
     */
    signIn() {
        return gapi.auth2.getAuthInstance().signIn();
    }

    /**
     *  Sign out the user upon button click.
     */
    signOut() {
        return gapi.auth2.getAuthInstance().signOut();
    }

    makeDate(date?: Date) {
        if (!date) {
            date = new Date();
        }
        return moment(date).format();
    }

    getTimeZone() {
        return moment.tz.guess();
    }

    makeFullDate(date: Date) {
        return {
            dateTime: this.makeDate(date),
            timeZone: this.getTimeZone()
        };
    }

}
