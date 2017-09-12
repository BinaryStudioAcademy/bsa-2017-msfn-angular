import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { INotification } from '../models/notification';
import { WindowObj } from './window.service';

@Injectable()
export class NotificationsService {

    public notifications: INotification[] = [];
    private userId: string;
    public unreadCount = 0;

    constructor(private socketService: SocketService,
                private window: WindowObj) {
        this.userId = this.window.data._injectedData.userId;

        this.socketService.send('get_notifications', JSON.stringify({
            userId: this.userId
        }));

        this.socketService.addListener('follow', (data) => {
            this.addNotification(data);
        });

        this.socketService.addListener('unfollow', (data) => {
            this.hideNotification(data.id);
        });

        this.socketService.addListener('get_notifications:success', (json) => {
            let data;
            try {
                data = JSON.parse(json);
            } catch (err) {
                console.error(err);
                return;
            }
            this.setNotifications(data);
            this.updateUnreadCount();
        });

        this.socketService.addListener('read_notification:success', (json) => {
            let data;
            try {
                data = JSON.parse(json);
            } catch (err) {
                console.error(err);
                return;
            }

        });

        /// must be removed
        this.socketService.addListener('add_notification:success', (json) => {
            this.socketService.send('get_notifications', JSON.stringify({
                userId: this.userId
            }));
        });

        this.socketService.addListener('join_room:success', (json) => {
        });

        this.socketService.addListener('new_coach_request', (json) => {
            let data;
            try {
                data = JSON.parse(json);
            } catch (err) {
                return;
            }
            this.addNotification(data);
        });
    }

    public hideNotification(id) {
        const notification = this.getNotificationById(id);
        if (notification) {
            this.notifications.splice(this.notifications.indexOf(notification), 1);
        }
        this.updateUnreadCount();
    }

    public setNotifications(data: INotification[]) {
        this.notifications = [];
        data.forEach(item => {
            this.addNotification(item);
        });
    }

    public addNotification(data: INotification) {
        this.notifications.unshift(data);
        this.updateUnreadCount();
    }

    public markRead(data: INotification) {
        this.socketService.send('read_notification', JSON.stringify({
            id: data._id,
            userId: this.userId
        }));
        data.read = true;
        this.updateUnreadCount();
    }

    public getNotificationById(id: string) {
        let _return;
        _return = this.notifications.filter(item => {
            return (item._id === id);
        });
        return _return.shift();
    }

    private updateUnreadCount() {
        this.unreadCount = (this.notifications.filter((note) => {
            return note.read === false;
        })).length;
    }
}
