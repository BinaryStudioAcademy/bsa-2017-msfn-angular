import { MdDialog, MdDialogRef } from '@angular/material';
import { SelectUsersDialogComponent } from './../../../../select-users-dialog/select-users-dialog.component';
import { Router } from '@angular/router';
import { TribeService } from './../../../tribe.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tribe-permissions',
    templateUrl: './tribe-permissions.component.html',
    styleUrls: ['./tribe-permissions.component.scss'],
    providers: [TribeService]
})
export class TribePermissionsComponent implements OnInit {
    tribeID: any;
    tribe: any;
    members = [];
    canPost = [];
    canComment = [];
    constructor(private tribeService: TribeService,
        private dialog: MdDialog,
        private dialogRef: MdDialogRef<any>,
        private router: Router) { }

    ngOnInit() {
        this.tribeID = this.router.url.split('/permissions')[0].split('tribe-settings/').pop();
        this.tribeService.getTribe(this.tribeID, res => {
            console.log(res);
            this.tribe = res;
        });
        this.tribeService.getTribeMembers(this.tribeID, 'members', res => {
            console.log(res);
            this.members = res;
        });
        /*
        this.tribeService.getTribeMembers(this.tribeID, 'canPost', res => {
            console.log(res);
            this.canPost = res;
        });

        this.tribeService.getTribeMembers(this.tribeID, 'canComment', res => {
            console.log(res);
            this.canComment = res;
        });
        */

    }
    openDialog(whom) {
        this.dialogRef = this.dialog.open(SelectUsersDialogComponent, {
            data: {
                members: this.members,
                whom: whom
            }
        });
    }
}
