import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { INotification } from '../models/notification';
import { WindowObj } from './window.service';

@Injectable()
export class NotificationsService {

    public notifications: INotification[] = [];
    private userId: string;

    constructor(private socketService: SocketService,
        private window: WindowObj) {
        this.userId = this.window.data._injectedData.userId;

        this.socketService.send('get_notifications', JSON.stringify({
            userId: this.userId
        }));

        this.socketService.addListener('follow', (data) => {
            const newNotification: INotification = {
                title: 'New follower',
                message: `${data.email} is now following you`,
                callback: () => {
                    console.log(data);
                }
            };
            this.addNotification(newNotification);
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
    }

    public setNotifications(data: INotification[]) {
        this.notifications = [];
        data.forEach(item => {
            this.addNotification(item);
        });
    }

    public addNotification(data: INotification) {
        this.notifications.push(data);
    }

    public markRead(id) {
        this.socketService.send('read_notification', JSON.stringify({
            id: id,
            userId: this.userId
        }));
    }

    public getNotificationById(id: string) {
        let _return;
        _return = this.notifications.filter(item => {
            return (item._id === id);
        });
        return _return.shift();
    }
}
