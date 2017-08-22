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

    dataToDisplay = {
        title: 'Goals'
    };

    ngOnInit() {
    }

}
