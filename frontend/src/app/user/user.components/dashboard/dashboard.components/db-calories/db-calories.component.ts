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

    ngOnInit() {
    }

}
