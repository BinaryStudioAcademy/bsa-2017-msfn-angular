import {Component, EventEmitter, Input, OnChanges, OnInit, Output, AfterViewInit, DoCheck} from '@angular/core';
import {WindowObj} from '../../../../services/window.service';
import {ChatService} from '../../../../services/chat.service';

@Component({
    selector: 'app-chat-window',
    templateUrl: './chat-window.component.html',
    styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, AfterViewInit {

    @Output() close: EventEmitter<any> = new EventEmitter<any>();
    @Input() chat;
    private lastMessage = '';
    private keysPressed: any[] = [];
    private userId = (this.window.data._injectedData as any).userId;
    private chatWrapper: any;
    private messagesWrapper: any;
    private messagesCount: number;

    constructor(private window: WindowObj,
                private chatService: ChatService) {}

    ngOnInit() {
        this.messagesCount = this.chat.messages.length;
    }

    ngAfterViewInit() {
        this.chatWrapper = document.getElementById(this.chat.room);
        this.messagesWrapper = this.chatWrapper.querySelector('.messages-wrapper');
        this.scrollToBottom();
    }

    public resizeInput(shadowInput, input, event) {
        this.keysPressed[event.keyCode] = false;

        if (input.value === this.lastMessage) {
            return;
        }
        setTimeout(() => {
            const minHeight = 30,
                lineHeight = 19,
                maxHeight = 110;

            const lines = shadowInput.innerHTML.split('\n');

            let currentHeight = shadowInput.getBoundingClientRect().height;

            if (lines[lines.length - 1] === '') {
                currentHeight += lineHeight;
            }
            if (currentHeight < minHeight) {
                currentHeight = minHeight;
            }
            if (currentHeight > maxHeight) {
                currentHeight = maxHeight;
            }

            input.style.height = currentHeight + 'px';
        }, 10);
    }

    public sendMessageInit(event, input) {
        this.keysPressed[event.keyCode] = true;
        if (event.keyCode === 13 && !this.keysPressed[16]) {
            event.preventDefault();
            this.sendMessage(input.value);
            input.value = '';
            input.style.height = '30px';
            return;
        }
    }

    private sendMessage(message) {
        this.chatService.sendMessage(this.chat, message);
    }

    public toogleMinimized() {
        this.chat.minimized = !this.chat.minimized;
    }

    public closeChat() {
        this.close.emit(this.chat);
    }

    private scrollToBottom() {
        if (this.messagesWrapper) {
            setTimeout(() => {
                const height = this.messagesWrapper.scrollHeight;
                this.messagesWrapper.scrollTop = height;
            });
        }
    }
}
