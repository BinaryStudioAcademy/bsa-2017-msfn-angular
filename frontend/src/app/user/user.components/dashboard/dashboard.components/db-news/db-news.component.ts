import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';

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

    news = [
        {
            title: 'Lorem',
            date: '2017-08-23',
            text: 'Sed scelerisque pretium turpis, varius euismod nunc malesuada sit amet.' +
            'Ut ultricies eleifend consequat. Morbi elementum arcu ipsum, id maximus sem porttitor quis.'
        },
        {
            title: 'Ipsum',
            date: '2017-08-22',
            text: 'Donec quis lorem non ante ultrices porta.' +
            'Cras ac rhoncus mauris. Fusce ac vestibulum est, ultricies tincidunt justo.'
        },
        {
            title: 'Dolor sit',
            date: '2017-08-21',
            text: 'Aliquam ullamcorper lacus et dui interdum, quis lobortis lorem fringilla.' +
            'Aenean auctor porttitor est, eget euismod sapien gravida posuere.'
        }
    ];

    selIndex = 0;
    indexes = [...Array(this.news.length).keys()];

    ngOnInit() {
    }
}
