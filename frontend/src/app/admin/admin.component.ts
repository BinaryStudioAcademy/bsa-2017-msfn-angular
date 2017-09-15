import { Component, OnInit } from '@angular/core';
import {SocketService} from '../services/socket.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

    constructor(private socketService: SocketService) { }

    ngOnInit() {
        this.socketService.send('join_room', JSON.stringify({room: 'admin'}));
    }

    swipe(sidebar, swypetype) {
        console.log('sas');
        if (swypetype === 'swiperight') {
            sidebar.classList.remove('hide');
        } else if (swypetype === 'swipeleft') {
            sidebar.classList.add('hide');
        }
    }

}
