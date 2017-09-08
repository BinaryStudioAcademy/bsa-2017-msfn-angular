import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { CoachService } from '../coach.service';
import { DateService } from '../../../../services/date.service';

@Component({
    selector: 'app-coach-articles',
    templateUrl: './coach-articles.component.html',
    styleUrls: [
        './coach-articles.component.scss',
        '../coach.component.scss'
    ],
    providers: [
        CoachService,
        DateService
    ]
})
export class CoachArticlesComponent implements OnInit {

    constructor(private coachService: CoachService,
                private dateService: DateService) {
    }

    @Input() userData;

    title = 'Articles';
    articles = [];

    paginatorOutput: any[];

    pageSizeOptions = [2, 4, 5];
    pageEvent: PageEvent = {
        pageIndex: 0,
        pageSize: 2,
        length: this.articles.length
    };

    ngOnInit() {
        this.coachService.getArticles(this.userData._id, res => {
            this.articles = res;
            this.makePaginatorOutput();

            for (const article of this.articles) {
                article.dateOutput = this.dateService
                    .convertDateToIso(new Date(article.date));
            }
        });
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
