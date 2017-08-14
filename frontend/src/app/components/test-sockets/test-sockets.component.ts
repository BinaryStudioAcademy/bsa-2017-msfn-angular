import {Component, OnInit} from '@angular/core';
import {ToasterService} from '../../services/toastr.service';
import {SocketService} from '../../services/socket.service';

@Component({
    selector: 'app-test-sockets',
    providers: [ToasterService],
    templateUrl: './test-sockets.component.html',
    styleUrls: ['./test-sockets.component.scss']
})
export class TestSocketsComponent implements OnInit {

    constructor(private socketService: SocketService) {

    }

    ngOnInit() {

    }

    send(message) {
        this.socketService.send('follow', message);
    }
}
