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

    public chats = [];

    constructor(private window: WindowObj,
                private chatService: ChatService) {
    }

    ngOnInit() {
        setTimeout(() => {
            this.loadChats();
        }, 500);
    }

    ngOnChanges() {
        this.loadChats();
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

    public loadChats() {
        this.chats = this.chatService.chats.map(chat => {
            const users = chat.users.filter(user => {
                return (user._id !== this.userId);
            });
            chat.user = users.shift();
            return chat;
        });
        console.log('UPDATE CHATS IN COMPONENT');
        console.log(this.chats);
    }
}
