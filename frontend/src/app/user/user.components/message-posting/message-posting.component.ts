import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IPost } from '../../../models/post';
import { WindowObj } from '../../../services/window.service';
import { MessagePostingService } from './message-posting.service';

@Component({
    selector: 'app-post-dialog',
    templateUrl: './message-posting.component.html',
    styleUrls: ['./message-posting.component.scss'],
    providers: [MessagePostingService]
})
export class MessagePostingComponent implements OnInit {

    constructor(private window: WindowObj,
                private messagePostingService: MessagePostingService) {
    }

    userId = (this.window.data._injectedData as any).userId;
    postData: IPost;
    messageText: string = '';

    @Output() hideInput: EventEmitter<any> = new EventEmitter<any>();

    postFormControl = new FormControl('', [
        Validators.required,
        Validators.maxLength(300)
    ]);

    ngOnInit() {
    }

    postMessage() {
        if (this.messageText && this.postFormControl.valid) {
            this.postData = {
                userId: this.userId,
                date: new Date(),
                body: this.messageText
            };

            this.messagePostingService.postMessage(this.postData, data => {
                if (data) {
                    this.hideInput.emit();
                    this.messageText = '';
                    this.postFormControl.reset();
                }
            });
        }
    }
}
