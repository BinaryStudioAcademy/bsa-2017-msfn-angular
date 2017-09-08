import {Injectable} from '@angular/core';
import {SocketService} from './socket.service';
import {WindowObj} from './window.service';
import {EncryptService} from './encrypt.service';

@Injectable()
export class ChatService {

    public userId = (this.window.data._injectedData as any).userId;
    public chats: any[] = [];

    constructor(private socketService: SocketService,
                private encryptService: EncryptService,
                private window: WindowObj) {
        this.socketService.addListener('get_chat_rooms:success', (result) => {
            const data = JSON.parse(result);

            data.forEach(room => {
                this.socketService.joinRoom(room.room);
            });

            console.log(data);

            this.chats = data;
        });
        this.socketService.addListener('create_room:success', (result) => {
            const data = JSON.parse(result);
            this.chats.push(data);
            data.users.forEach(user => {
                if (user._id !== this.userId) {
                    this.startChat(user._id);
                }
            });
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
        console.log(room);
    }

    public findRoom(reciever) {
        const chat = this.chats.filter(item => {
            return (item.users[0]._id === reciever || item.users[1]._id === reciever);
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

}
