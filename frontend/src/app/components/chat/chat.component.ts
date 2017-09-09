import {Component, OnChanges, OnInit} from '@angular/core';
import {WindowObj} from '../../services/window.service';
import {ChatService} from '../../services/chat.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnChanges {

    public chatListVisible = false;
    private userId = (this.window.data._injectedData as any).userId;

    public chats: any[] = [];

    constructor(private window: WindowObj,
                private chatService: ChatService) {
        const changesSubscribe = this.chatService.data.subscribe(
            value => {
                console.log(value);
                this.chats = value;
            }
        );
    }

    ngOnInit() {
    }

    ngOnChanges() {
    }

    public toggleChat() {
        this.chatListVisible = !this.chatListVisible;
    }

    public showChat() {
        this.chatListVisible = true;
    }

    public hideChat() {
        this.chatListVisible = false;
    }
}
