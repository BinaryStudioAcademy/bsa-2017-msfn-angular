import {Injectable} from '@angular/core';

declare const gapi: any;

@Injectable()
export class GCalendarService {

    private _clientId = '83981840514-r86m39o3uimhacsgcug75b08s48necae.apps.googleusercontent.com';
    private _docs = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];
    private _apiUrl = 'https://www.googleapis.com/auth/calendar';
    public client: any;
    public authorized: boolean;

    constructor() {
        gapi.load('client:auth2', () => {
            this.initClient();
        });
        console.log(this);
    }

    initClient() {
        gapi.client.init({
            discoveryDocs: this._docs,
            clientId: this._clientId,
            scope: this._apiUrl
        }).then(() => {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
        });
    }

    updateSigninStatus(status) {
        this.authorized = status;
    }

    checkAuthorized(callback) {
        if (this.authorized) {
            callback();
        } else {
            this.signIn().then(() => {
                callback();
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
                console.log(events);
            } else {
                console.log('no events');
            }
        });
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
        gapi.auth2.getAuthInstance().signOut();
    }

}
