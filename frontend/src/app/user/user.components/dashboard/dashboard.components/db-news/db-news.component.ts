import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-db-news',
    templateUrl: './db-news.component.html',
    styleUrls: [
        './db-news.component.scss',
        '../../dashboard.component.scss'
    ]
})
export class DbNewsComponent implements OnInit {

    constructor() { }

    dataToDisplay = {
        title: 'News Feed'
    };

    ngOnInit() {
    }

}
