import {Component, OnInit} from '@angular/core';
import {ToasterService} from '../../services/toastr.service';
import {SocketService} from '../../services/socket.service';
import {WindowObj} from '../../services/window.service';

@Component({
    selector: 'app-test-sockets',
    providers: [ToasterService],
    templateUrl: './test-sockets.component.html',
    styleUrls: ['./test-sockets.component.scss']
})
export class TestSocketsComponent implements OnInit {

    constructor(private socketService: SocketService, private window: WindowObj) {
        this.socketService.addListener('get_notifications:success', (json) => {
                let data;
                try {
                    data = JSON.parse(json);
                } catch (err) {
                    console.error(err);
                    return;
                }
                console.log(data);
            });
    }

    ngOnInit() {

    }

    send(event, message) {
        this.socketService.send(event, JSON.stringify({
            title: 'test123',
            message: 'mesasge321',
            userId: this.window.data._injectedData.userId,
            id: message
        }));
    }
}
