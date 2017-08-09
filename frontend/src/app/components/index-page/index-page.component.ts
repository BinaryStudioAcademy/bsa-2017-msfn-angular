import {Component, OnInit} from '@angular/core';
import {GCalendarService} from '../../services/gcalendar.service';

@Component({
    selector: 'app-index-page',
    templateUrl: './index-page.component.html',
    styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit {

    public test = new GCalendarService();

    constructor() {
    }

    ngOnInit() {
    }

}
