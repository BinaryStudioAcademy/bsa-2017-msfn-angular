import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-db-events',
    templateUrl: './db-events.component.html',
    styleUrls: [
        './db-events.component.scss',
        '../../dashboard.component.scss'
    ]
})
export class DbEventsComponent implements OnInit {

    constructor() { }

    dataToDisplay = {
        title: 'Planned Events'
    };

    startDate: string;
    endDate: string;
    selEvent: string;

    events = [
        {
            date: '',
            value: ''
        }
    ];

    ngOnInit() {
    }
}
