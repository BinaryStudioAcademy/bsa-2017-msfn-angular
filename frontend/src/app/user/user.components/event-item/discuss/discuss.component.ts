import {Component, Input, OnInit} from '@angular/core';
import {EventService} from '../../../services/event.service';
import {DateService} from '../../../../services/date.service';
import {ActivatedRoute} from '@angular/router';
import {WindowObj} from '../../../../services/window.service';
import {MessagePostingService} from '../../message-posting/message-posting.service';
import {PageEvent} from '@angular/material';
import {IMessage} from '../../../../models/message';
import {FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'app-discuss',
    templateUrl: './discuss.component.html',
    styleUrls: ['./discuss.component.scss'],
    providers: [
        EventService,
        MessagePostingService
    ]
})
export class DiscussComponent implements OnInit {

    constructor(public activatedRoute: ActivatedRoute,
                private eventService: EventService,
                private dateService: DateService,
                private window: WindowObj,
                private messagePostingService: MessagePostingService) {
    }

    private _userId = this.window.data._injectedData.userId;
    eventId: string;

    @Input() event;
    messages = [];

    paginatorOutput: any[];

    pageSizeOptions = [2, 4, 5];
    pageEvent: PageEvent = {
        pageIndex: 0,
        pageSize: 2,
        length: this.messages.length
    };

    posting: boolean = false;
    postData: IMessage;

    postFormControl = new FormControl('', [
        Validators.required,
        Validators.maxLength(300)
    ]);

    ngOnInit() {
        if (this.activatedRoute.snapshot.params.id) {
            this.eventId = this.activatedRoute.snapshot.parent.params.id;
            this.getEvent(this.eventId);
        }
    }

    getEvent(id: string): void {
        this.eventService.getItem(id, data => {
            this.event = data;
            console.log(data);
            this.messages = this.event;
            this.makePaginatorOutput();
        });
    }

    makePaginatorOutput() {
        this.paginatorOutput = [];
        const startPos = this.pageEvent.pageIndex * this.pageEvent.pageSize;
        let pageSize = startPos + this.pageEvent.pageSize;
        pageSize = pageSize > this.messages.length ? this.messages.length : pageSize;

        for (let i = startPos; i < pageSize; i++) {
            this.paginatorOutput.push(this.messages[i]);
        }
    }

    openMessageInput(): void {
        this.posting = true;
    }

    closeMessageInput() {
        this.posting = false;
    }

    updateData() {
        this.messages = [];
        this.getEvent(this.eventId);
    }

    updateMessage(post): void {
        if (post.editing) {
            if (post.body && this.postFormControl.valid) {
                this.postData = {
                    user: this._userId,
                    date: new Date(),
                    body: post.body,
                    event: this.eventId
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
