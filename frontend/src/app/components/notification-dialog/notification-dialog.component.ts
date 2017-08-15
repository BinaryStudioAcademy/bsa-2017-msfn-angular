import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialog, MdDialogRef } from '@angular/material';
import { NotificationDataDialogComponent } from '../notification-data-dialog/notification-data-dialog.component';

@Component({
    selector: 'app-notification-dialog',
    templateUrl: './notification-dialog.component.html',
    styleUrls: ['./notification-dialog.component.scss']
})
export class NotificationDialogComponent implements OnInit {
    notification = [
        {
            title: 'first notification',
            message: '1 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima, quisquam.'
        },
        {
            title: 'second notification',
            message: '2 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima, quisquam.'
        },
        {
            title: 'third notification',
            message: '3 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima, quisquam.'
        },
        {
            title: 'fourth notification',
            message: '4 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima, quisquam.'
        },

    ];
    constructor( @Inject(MD_DIALOG_DATA) public data: any,
        private dialog: MdDialog) {
    }

    ngOnInit() {
    }

    onClick(noteIndex) {
        const dialogRef = this.dialog.open(NotificationDataDialogComponent, {
            data: noteIndex,
            position: {
                top: '160px'
            }
        });
        this.notification.splice(this.notification.indexOf(noteIndex), 1);
    }
}
