import {Injectable} from '@angular/core';
import {SocketService} from './socket.service';
import {WindowObj} from './window.service';
import {EncryptService} from './encrypt.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class ChatService {

    public userId = (this.window.data._injectedData as any).userId;
    public chats: any[] = [];
    public activeChats: any[] = [];

    public data: Subject<any[]> = new Subject();
    public activeData: Subject<any[]> = new Subject();


    constructor(private socketService: SocketService,
                private encryptService: EncryptService,
                private window: WindowObj) {
        this.socketService.addListener('get_chat_rooms:success', (result) => {
            let data = JSON.parse(result);

            data = data.map(chat => {
                const users = chat.users.filter(user => {
                    return (user._id !== this.userId);
                });
                chat.user = users.shift();
                return chat;
            });

            data.forEach(room => {
                this.socketService.joinRoom(room.room);
            });

            this.chats = data;
            this.changeChats();
        });
        this.socketService.addListener('create_room:success', (result) => {
            const data = JSON.parse(result);
            const users = data.users.filter(user => {
                return (user._id !== this.userId);
            });
            data.user = users.shift();
            this.chats.push(data);
            data.users.forEach(user => {
                if (user._id !== this.userId) {
                    this.startChat(user._id);
                }
            });
            this.changeChats();
        });

        this.loadChats();
    }

    public loadChats() {
        const data = {
            user: this.userId
        };
        this.socketService.send('get_chat_rooms', this.encryptService.encrypt(data));
    }

    public startChat(reciever) {
        const room = this.findRoom(reciever);
        if (!room) {
            this.createRoom(reciever);
            return;
        }
        this.socketService.joinRoom(room.room);
        this.openChat(room);
        this.changeChats();
    }

    public findRoom(reciever) {
        const chat = this.chats.filter(item => {
            if (!item || !item.user) {
                return false;
            }
            return (item.user._id === reciever);
        });

        return chat.shift();
    }

    public createRoom(reciever) {
        const data = {
            senderId: this.userId,
            recieverId: reciever
        };
        this.socketService.send('create_room', this.encryptService.encrypt(data));
    }

    public changeChats() {
        this.data.next(this.chats);
    }

    public changeActiveChats() {
        this.activeData.next(this.activeChats);
    }

    public openChat(chat) {
        if (this.activeChats.indexOf(chat) !== -1) {
            chat.minimized = false;
            this.changeActiveChats();
            return;
        }
        chat.active = true;
        this.activeChats.push(chat);
        if (this.activeChats.length > 3) {
            this.activeChats.shift();
        }
        this.changeActiveChats();
    }

    public closeChat(chat) {
        const room = this.findRoom(chat.user._id);
        room.active = false;
        this.activeChats.splice(this.activeChats.indexOf(room), 1);
        this.changeActiveChats();
    }
}
