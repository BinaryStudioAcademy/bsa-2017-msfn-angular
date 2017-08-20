import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    constructor() { }

    dataToDisplay = {
        weight: {
            title: 'Weight Control'
        },
        calories: {
            title: 'Burned Calories'
        },
        events: {
            title: 'Planned Events'
        },
        food: {
            title: 'Food Plan'
        },
        news: {
            title: 'News Feed'
        },
        aim: {
            title: 'Goals'
        }
    };

    ngOnInit() {
    }

}
