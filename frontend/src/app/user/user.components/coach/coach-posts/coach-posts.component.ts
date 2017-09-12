import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { MessagePostingService } from '../../message-posting/message-posting.service';
import { DateService } from '../../../../services/date.service';

@Component({
    selector: 'app-coach-posts',
    templateUrl: './coach-posts.component.html',
    styleUrls: [
        './coach-posts.component.scss',
        '../coach.component.scss'
    ],
    providers: [
        MessagePostingService,
        DateService
    ]
})
export class CoachPostsComponent implements OnInit {

    constructor(private messagePostingService: MessagePostingService,
                private dateService: DateService) {
    }

    @Input() userData;

    title = 'Posts';
    posts = [];

    paginatorOutput: any[];

    pageSizeOptions = [2, 4, 5];
    pageEvent: PageEvent = {
        pageIndex: 0,
        pageSize: 2,
        length: this.posts.length
    };

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.messagePostingService.getMessages(this.userData._id, data => {
            if (data[0].hasOwnProperty('user')) {
                this.posts = data;

                for (const message of this.posts) {
                    message.dateOutput = this.dateService
                        .convertDateToIso(new Date(message.date), true);
                    message.editing = false;
                }

                this.makePaginatorOutput();
            }
        });
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
