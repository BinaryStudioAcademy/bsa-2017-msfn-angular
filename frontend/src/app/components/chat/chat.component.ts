import {AfterViewInit, Component, OnChanges, OnInit, QueryList, ViewChildren} from '@angular/core';
import {WindowObj} from '../../services/window.service';
import {ChatService} from '../../services/chat.service';
import {ChatWindowComponent} from './components/chat-window/chat-window.component';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnChanges, AfterViewInit {

    public chatListVisible = false;
    private userId = (this.window.data._injectedData as any).userId;

    public chats: any[] = [];
    public activeChats: any[] = [];
    private chatToggleTimeout: any;

    constructor(private window: WindowObj,
                private chatService: ChatService) {
        const changesSubscribe = this.chatService.data.subscribe(
            value => {
                this.chats = value;
            }
        );
        const activeChangesSubscribe = this.chatService.activeData.subscribe(
            value => {
                this.activeChats = value;
            }
        );
    }

    ngOnInit() {
    }

    ngOnChanges() {
    }

    ngAfterViewInit() {
    }

    public toggleChat() {
        if (!this.chatToggleTimeout) {
            this.chatListVisible = !this.chatListVisible;
            this.chatToggleTimeout = setTimeout(() => {
                this.chatToggleTimeout = null;
            }, 500);
        }
    }

    public showChat() {
        this.chatListVisible = true;
    }

    public hideChat() {
        this.chatListVisible = false;
    }

    public startChat(chat) {
        this.chatService.startChat(chat.user._id);
    }

    public closeChat(chat) {
        this.chatService.closeChat(chat);
    }
}
