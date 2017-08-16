import {Injectable} from '@angular/core';
import {SocketService} from './socket.service';
import {INotification} from '../models/notification';

@Injectable()
export class NotificationsService {

    public notifications: INotification[] = [];

    constructor(private SocketService: SocketService) {
        this.SocketService.addListener('follow', (data) => {
            alert(1);
            const newNotification: INotification = {
                title: 'New follower',
                message: `${data.email} is now following you`,
                callback: () => {
                    console.log(data);
                }
            };
            console.log(data);
            this.addNotification(newNotification);
        });
        const test: INotification = {
            title: 'New follower',
            message: `Test is now following you`,
            callback: () => {
                console.log(123);
            }
        };
        this.addNotification(test);
    }

    public addNotification(data: INotification) {
        this.notifications.push(data);
    }
}
