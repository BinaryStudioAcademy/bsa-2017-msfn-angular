import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';

@Component({
    selector: 'app-coach-posts',
    templateUrl: './coach-posts.component.html',
    styleUrls: [
        './coach-posts.component.scss',
        '../coach.component.scss'
    ]
})
export class CoachPostsComponent implements OnInit {

    constructor() {
    }

    title = 'Posts';

    posts = [
        {
            name: 'Brick',
            avatar: '../../resources/default.png',
            date: '2h ago',
            text: 'Vivamus vel diam non mauris euismod commodo.' +
                'Etiam massa dolor, placerat at luctus vitae, elementum sit amet erat.'
        },
        {
            name: 'Brick',
            avatar: '../../resources/default.png',
            date: '9h ago',
            text: 'Nam maximus at augue at mollis.' +
                'Etiam et felis vitae ligula luctus efficitur vitae eu nibh.' +
            'Aenean dapibus pellentesque libero nec lacinia.'
        },
        {
            name: 'Brick',
            avatar: '../../resources/default.png',
            date: '20h ago',
            text: 'Quisque quis dui iaculis, pulvinar leo eget, mollis metus.'
        },
        {
            name: 'Brick',
            avatar: '../../resources/default.png',
            date: 'Sep 5, 2017',
            text: 'Morbi augue neque, aliquam et fermentum eget, sodales id mauris.'
        },
        {
            name: 'Brick',
            avatar: '../../resources/default.png',
            date: 'Sep 1, 2017',
            text: 'Proin viverra.'
        }
    ];

    paginatorOutput: any[];

    pageSizeOptions = [2, 4, 5];
    pageEvent: PageEvent = {
        pageIndex: 0,
        pageSize: 2,
        length: this.posts.length
    };

    ngOnInit() {
        this.makePaginatorOutput();
    }

    makePaginatorOutput() {
        this.paginatorOutput = [];
        const startPos = this.pageEvent.pageIndex * this.pageEvent.pageSize;
        let pageSize = startPos + this.pageEvent.pageSize;
        pageSize = pageSize > this.posts.length ? this.posts.length : pageSize;

        for (let i = startPos; i < pageSize; i++) {
            this.paginatorOutput.push(this.posts[i]);
        }
    }
}
