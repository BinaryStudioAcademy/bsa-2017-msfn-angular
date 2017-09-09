import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-chat-window',
    templateUrl: './chat-window.component.html',
    styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {

    @Output() close: EventEmitter<any> = new EventEmitter<any>();
    @Input() chat;
    private lastMessage = '';
    private keysPressed: any[] = [];
    public minimized = false;

    constructor() {
    }

    ngOnInit() {
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
        console.log(message);
    }

    public toogleMinimized() {
        this.minimized = !this.minimized;
    }

    public closeChat() {
        this.close.emit(this.chat);
    }
}
