import { Component, OnInit } from '@angular/core';
import { WindowObj } from '../../../../../services/window.service';
import { IMessage } from '../../../../../models/message';
import { MessagePostingService } from '../../../message-posting/message-posting.service';
import { PageEvent } from '@angular/material';
import { DateService } from '../../../../../services/date.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-db-news',
    templateUrl: './db-news.component.html',
    styleUrls: [
        './db-news.component.scss',
        '../../dashboard.component.scss'
    ],
    providers: [MessagePostingService]
})
export class DbNewsComponent implements OnInit {

    constructor(private window: WindowObj,
                private messagePostingService: MessagePostingService,
                private dateService: DateService) { }

    title = 'News Feed';
    userId = (this.window.data._injectedData as any).userId;

    news = [];
    messages = [];

    paginatorOutput: any[];

    pageSizeOptions = [2, 4, 5];
    pageEvent: PageEvent = {
        pageIndex: 0,
        pageSize: 2,
        length: this.news.length
    };

    posting: boolean = false;
    postData: IMessage;

    postFormControl = new FormControl('', [
        Validators.required,
        Validators.maxLength(300)
    ]);

    ngOnInit() {
        this.getData();
    }

    getData() {
        this.messagePostingService.getMessages(this.userId, data => {
            this.messages = data;

            for (const message of this.messages) {
                message.dateOutput = this.dateService
                    .convertDateToIso(new Date(message.date), true);
                message.editing = false;
            }
            this.news = this.sortAndFilterMessages(this.news.concat(this.messages));
            this.makePaginatorOutput();
        });
    }

    makePaginatorOutput() {
        this.paginatorOutput = [];
        const startPos = this.pageEvent.pageIndex * this.pageEvent.pageSize;
        let pageSize = startPos + this.pageEvent.pageSize;
        pageSize = pageSize > this.news.length ? this.news.length : pageSize;

        for (let i = startPos; i < pageSize; i++) {
            this.paginatorOutput.push(this.news[i]);
        }
    }

    sortAndFilterMessages(value: any[]): any {
        return value.filter(message => {
            if (message.event) {
                return false;
            }
            return true;
        })
        .sort((a, b) => {
            return (new Date(b.date).valueOf() - new Date(a.date).valueOf());
        });
    }

    openMessageInput(): void {
        this.posting = true;
    }

    closeMessageInput() {
        this.posting = false;
    }

    updateData() {
        this.news = [];
        this.getData();
    }

    updateMessage(post): void {
        if (post.editing) {
            if (post.body && this.postFormControl.valid) {
                this.postData = {
                    user: this.userId,
                    date: new Date(),
                    body: post.body
                };

                this.messagePostingService.updateMessage(post._id, this.postData, () => {
                    setTimeout(() => {
                        this.updateData();
                    }, 200);
                    post.editing = false;
                });
            }
        } else {
            post.editing = true;
            post.oldBody = post.body;
        }
    }

    deleteMessage(id): void {
        this.messagePostingService.deleteMessage(id, () => {
            setTimeout(() => {
                this.updateData();
            }, 500);
        });
    }

    closeEditInput(post) {
        post.editing = false;
        post.body = post.oldBody;
        delete post.oldBody;
    }
}
