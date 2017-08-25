import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-db-calories',
    templateUrl: './db-calories.component.html',
    styleUrls: [
        './db-calories.component.scss',
        '../../dashboard.component.scss'
    ]
})
export class DbCaloriesComponent implements OnInit {

    constructor() { }

    dataToDisplay = {
        title: 'Burned Calories'
    };

    burnedCalories = [
        {
            date: '2017-08-21',
            amount: '300'
        },
        {
            date: '2017-08-22',
            amount: '320'
        },
        {
            date: '2017-08-23',
            amount: '280'
        },
        {
            date: '2017-08-24',
            amount: '350'
        },
        {
            date: '2017-08-25',
            amount: '420'
        },
        {
            date: '2017-08-26',
            amount: '390'
        },
        {
            date: '2017-08-27',
            amount: '450'
        },
        {
            date: '2017-08-28',
            amount: '310'
        },
    ];

    ngOnInit() {
    }

}
