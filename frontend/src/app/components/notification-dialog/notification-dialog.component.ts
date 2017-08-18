import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NotificationDataDialogComponent } from '../notification-data-dialog/notification-data-dialog.component';
import { INotification } from '../../models/notification';
import { NotificationsService } from '../../services/notifications.service';

@Component({
    selector: 'app-notification-dialog',
    templateUrl: './notification-dialog.component.html',
    styleUrls: ['./notification-dialog.component.scss']
})
export class NotificationDialogComponent implements OnInit {
    notifications = [];
    readNotifications = [];
    constructor( @Inject(MD_DIALOG_DATA) public data: any,
        private dialog: MdDialog,
        private notificationsService: NotificationsService) {
    }

    ngOnInit() {
        this.notifications = this.data.slice();
    }

    makeRead() {
        console.log(this.notifications);
        this.notifications.forEach(note => {
            this.notificationsService.markRead(note._id);
        });
        this.data.length = 0;

    }

    viewNotification(notificatio: INotification, index) {
        const dialogRef = this.dialog.open(NotificationDataDialogComponent, {
            data: {
                title: notificatio.title,
                message: notificatio.message
            },
            position: {
                top: '160px'
            }
        });
        const readNote = this.data.splice(index, 1);
        this.readNotifications.push(readNote[0]);
        this.notificationsService.markRead(notificatio._id);
    }
    onClickAll() {
        if (this.readNotifications.length) {
            this.data = this.data.concat(this.readNotifications);
            this.readNotifications.length = 0;
        }
        // this.data = this.notifications;
    }
    onClickUnread() {
        this.data = this.notificationsService.notifications.filter((note) => {
            return note.read === false;
        });
    }
}
