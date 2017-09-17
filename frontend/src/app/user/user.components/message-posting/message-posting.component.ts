import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IMessage } from '../../../models/message';
import { ITestimonial } from '../../../models/testimonial';
import { WindowObj } from '../../../services/window.service';
import { MessagePostingService } from './message-posting.service';

@Component({
    selector: 'app-message-posting',
    templateUrl: './message-posting.component.html',
    styleUrls: ['./message-posting.component.scss'],
    providers: [MessagePostingService]
})
export class MessagePostingComponent implements OnInit {

    constructor(private window: WindowObj,
                private messagePostingService: MessagePostingService) {
    }

    @Input() parentElement: string;
    @Input() coachId: string;
    @Input() eventId: string;

    userId = (this.window.data._injectedData as any).userId;
    buttonValue: string;
    messageText: string = '';

    @Output() hideInput: EventEmitter<any> = new EventEmitter<any>();

    postFormControl = new FormControl('', [
        Validators.required,
        Validators.maxLength(300)
    ]);

    ngOnInit() {
        switch (this.parentElement) {
            case 'userDb':
                this.buttonValue = 'Post a message';
                break;
            case 'coachPage':
                this.buttonValue = 'Post a feedback';
                break;
            default:
                this.buttonValue = 'Post';
        }
    }

    postMessage(): void {
        if (this.messageText && this.postFormControl.valid) {
            let postData: IMessage;

            postData = {
                user: this.userId,
                date: new Date(),
                body: this.messageText,
                isRemoved: false
            };

            if (this.parentElement === ('userDb' || 'event')) {
                if (this.parentElement === 'event') {
                    postData.event = this.eventId;
                }

                this.messagePostingService.postMessage(postData, data => {
                    if (data) {
                        this.hideInput.emit();
                        this.messageText = '';
                        this.postFormControl.reset();
                    }
                });
            } else {
                let testimonialData: ITestimonial;
                testimonialData = postData;
                testimonialData.coach = this.coachId;

                this.messagePostingService.postMessage(postData, data => {
                    if (data) {
                        this.hideInput.emit();
                        this.messageText = '';
                        this.postFormControl.reset();
                    }
                });
            }
        }
    }
}
