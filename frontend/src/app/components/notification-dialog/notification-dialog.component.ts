import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialog } from '@angular/material';
import { NotificationDataDialogComponent } from '../notification-data-dialog/notification-data-dialog.component';
import { INotification } from '../../models/notification';
import { NotificationsService } from '../../services/notifications.service';

@Component({
    selector: 'app-notification-dialog',
    templateUrl: './notification-dialog.component.html',
    styleUrls: ['./notification-dialog.component.scss']
})
export class NotificationDialogComponent implements OnInit {
    showedNotifications: INotification[];
    unreadNotifications: INotification[];
    reversed = false;

    constructor(@Inject(MD_DIALOG_DATA) public data: INotification[],
                private dialog: MdDialog,
                private notificationsService: NotificationsService) {
    }

    ngOnInit() {
        this.showedNotifications = this.data;
        this.unreadNotifications = this.data.filter((note) => {
            return note.read === false;
        });
        if (this.unreadNotifications.length > 0) {
            this.onClickUnread();
        }
    }

    makeRead() {
        this.unreadNotifications.forEach(note => {
                this.notificationsService.markRead(note);
            });
        this.updateUnread();
    }

    test(e) {
        const target = e._getHostElement();
        const textContainer = target.querySelector('span');
        return (textContainer.offsetWidth < target.offsetWidth);
    }

    viewNotification(notification: INotification) {
        this.dialog.open(NotificationDataDialogComponent, {
            data: {
                title: notification.title,
                message: notification.message
            }, position: {top: '160px'}
        });
        this.notificationsService.markRead(notification);
        this.updateUnread();
    }

    onClickAll() {
        this.showedNotifications = this.data;
    }

    onClickUnread() {
        this.showedNotifications = this.unreadNotifications;
    }

    updateUnread() {
        this.unreadNotifications = this.data.filter((note) => {
            return note.read === false;
        });
    }
}
