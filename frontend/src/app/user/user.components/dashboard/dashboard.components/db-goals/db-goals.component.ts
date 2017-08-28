import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-db-goals',
    templateUrl: './db-goals.component.html',
    styleUrls: [
        './db-goals.component.scss',
        '../../dashboard.component.scss'
    ]
})
export class DbGoalsComponent implements OnInit {

    constructor() { }

    title = 'Goals';

    goals = [
        {
            startDate: '2017-08-23',
            endDate: '2017-08-30',
            value: 'Run 3km for 7 days in a row',
            achieved: false
        },
        {
            startDate: '2017-08-23',
            endDate: '2017-09-30',
            value: 'Increase the number of pushups in a set to 50',
            achieved: false
        }
    ];

    ngOnInit() {
    }

}
