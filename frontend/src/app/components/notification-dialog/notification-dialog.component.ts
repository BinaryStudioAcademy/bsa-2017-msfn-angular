import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NotificationDataDialogComponent } from '../notification-data-dialog/notification-data-dialog.component';
import {INotification} from '../../models/notification';

@Component({
    selector: 'app-notification-dialog',
    templateUrl: './notification-dialog.component.html',
    styleUrls: ['./notification-dialog.component.scss']
})
export class NotificationDialogComponent implements OnInit {
    constructor( @Inject(MD_DIALOG_DATA) public data: any,
        private dialog: MdDialog) {
    }

    ngOnInit() {
    }

    onClick(notificatio: INotification, index) {
        const dialogRef = this.dialog.open(NotificationDataDialogComponent, {
            data: {
                title: notificatio.title,
                message: notificatio.message
            },
            position: {
                top: '160px'
            }
        });
        this.data.splice(index, 1);
    }
    callback(notification: INotification) {
        notification.callback();
        this.data.splice(this.data.indexOf(notification), 1);
    }
}
