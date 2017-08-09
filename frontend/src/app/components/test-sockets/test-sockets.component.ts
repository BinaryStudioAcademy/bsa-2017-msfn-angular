import {Component, OnInit} from '@angular/core';
import * as io from 'socket.io-client';
import {MdSnackBar} from '@angular/material';

@Component({
    selector: 'app-test-sockets',
    templateUrl: './test-sockets.component.html',
    styleUrls: ['./test-sockets.component.scss']
})
export class TestSocketsComponent implements OnInit {
    socket = io.connect('http://localhost:3060');

    constructor(private snackBar: MdSnackBar) {

    }

    private openSnackBar(message: string, action = 'Close') {
        this.snackBar.open(message, action, {
            duration: 4000,
        });
    }

    ngOnInit() {
        this.socket.on('connect', () => {
            this.openSnackBar('connected to server');
        });
        this.socket.on('disconnect', () => {
            this.openSnackBar('server is DOWN');
        });
        this.socket.on('feedbackFromServer', (message) => {
            this.openSnackBar(message);
        });
    }

    sendToServer(message: string) {
        this.socket.emit('messageToServer', message);
    }
}
