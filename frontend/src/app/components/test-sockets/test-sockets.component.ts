import {Component, OnInit} from '@angular/core';
import * as io from 'socket.io-client';
import {ToastrService} from '../../services/toastr.service';

@Component({
    selector: 'app-test-sockets',
    providers: [ToastrService],
    templateUrl: './test-sockets.component.html',
    styleUrls: ['./test-sockets.component.scss']
})
export class TestSocketsComponent implements OnInit {
    socket = io.connect('http://localhost:3060');

    constructor(private toastrService: ToastrService) {

    }

    ngOnInit() {
        this.socket.on('connect', () => {
            this.toastrService.showMessage('success', 'connected to server');
        });
        this.socket.on('disconnect', () => {
            this.toastrService.showMessage('error', 'server is DOWN');
        });
        this.socket.on('feedbackFromServer', (message) => {
            this.toastrService.showMessage('info', message);
        });
    }

    sendToServer(message: string) {
        this.socket.emit('messageToServer', message);
    }
}
