import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialog } from '@angular/material';
import {INotification} from '../../models/notification';

@Component({
    selector: 'app-notification-dialog',
    templateUrl: './notification-dialog.component.html',
    styleUrls: ['./notification-dialog.component.scss']
})
export class NotificationDialogComponent implements OnInit {

    constructor(@Inject(MD_DIALOG_DATA) public data: INotification[]) {
    }

    ngOnInit() {
    }

    callback(notification: INotification) {
        notification.callback();
        this.data.splice(this.data.indexOf(notification), 1);
    }

}
