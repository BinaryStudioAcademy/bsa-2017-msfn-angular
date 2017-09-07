import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';

@Component({
    selector: 'app-coach-articles',
    templateUrl: './coach-articles.component.html',
    styleUrls: [
        './coach-articles.component.scss',
        '../coach.component.scss'
    ]
})
export class CoachArticlesComponent implements OnInit {

    constructor() {
    }

    @Input() userData;

    title = 'Articles';

    articles = [
        {
            title: 'Praesent feugiat',
            date: 'Sep 6, 2017',
            image: '../../resources/default.png',
            text: 'Cras ac erat mattis, elementum ipsum sit amet, feugiat ante.' +
            'Aliquam velit turpis, sollicitudin ut ullamcorper tristique, eleifend ac turpis.' +
            'Ut molestie est at ex consectetur, eu gravida lectus suscipit.' +
            'In in leo sit amet felis venenatis faucibus. Mauris sapien ex, malesuada id turpis at.'
        },
        {
            title: 'Duis aliquet',
            date: 'Sep 4, 2017',
            image: '../../resources/default.png',
            text: 'Maecenas consectetur scelerisque orci.' +
                'Vestibulum sagittis dictum velit, posuere iaculis lorem egestas nec.' +
            'Donec ligula odio, sollicitudin eleifend arcu nec, rhoncus semper felis.' +
            'Aliquam dignissim in arcu quis tincidunt.' +
            'Praesent non hendrerit leo. Sed imperdiet id quam sed vestibulum.'
        }
    ];

    paginatorOutput: any[];

    pageSizeOptions = [2, 4, 5];
    pageEvent: PageEvent = {
        pageIndex: 0,
        pageSize: 2,
        length: this.articles.length
    };

    ngOnInit() {
        this.makePaginatorOutput();
    }

    makePaginatorOutput() {
        this.paginatorOutput = [];
        const startPos = this.pageEvent.pageIndex * this.pageEvent.pageSize;
        let pageSize = startPos + this.pageEvent.pageSize;
        pageSize = pageSize > this.articles.length ? this.articles.length : pageSize;

        for (let i = startPos; i < pageSize; i++) {
            this.paginatorOutput.push(this.articles[i]);
        }
    }
}
