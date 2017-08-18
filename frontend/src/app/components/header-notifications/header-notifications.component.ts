import {Component, OnInit} from '@angular/core';
import {MdDialog} from '@angular/material';
import {NotificationDialogComponent} from '../notification-dialog/notification-dialog.component';
import {NotificationsService} from '../../services/notifications.service';

@Component({
    selector: 'app-header-notifications',
    templateUrl: './header-notifications.component.html',
    styleUrls: ['./header-notifications.component.scss']
})
export class HeaderNotificationsComponent implements OnInit {

    private notificationsDialogConfig = {
        height: '300px',
        width: '200px',
        data: this.notificationsService.notifications,
        position: {
            top: '45px',
        }
    };

    constructor(public dialog: MdDialog,
                public notificationsService: NotificationsService) {
    }

    ngOnInit() {
    }

    openDialog() {
        this.notificationsDialogConfig.data = this.notificationsService.notifications;
        this.dialog.open(
            NotificationDialogComponent,
            this.notificationsDialogConfig
        );
    }

}
