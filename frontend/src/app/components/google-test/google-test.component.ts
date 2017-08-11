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

    public auth() {
        this.gcalendar.signIn();
    }

}
