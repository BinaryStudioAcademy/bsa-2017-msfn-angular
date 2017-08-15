import {Injectable} from '@angular/core';
import {SocketService} from './socket.service';

@Injectable()
export class NotificationsService {

    constructor(private SocketService: SocketService) {
        this.SocketService.addListener('follow', (data) => {
            console.log(data);
            alert(1);
        });
    }
}
