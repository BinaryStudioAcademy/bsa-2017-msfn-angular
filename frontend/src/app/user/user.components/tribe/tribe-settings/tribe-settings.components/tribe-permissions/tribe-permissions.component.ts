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
    dialogRef: MdDialogRef<any>;
    canComment = [];
    constructor(private tribeService: TribeService,
        private dialog: MdDialog,
        private router: Router) { }

    ngOnInit() {
        this.tribeID = this.router.url.split('/permissions')[0].split('tribe-settings/').pop();
        this.tribeService.getTribe(this.tribeID, res => {
            this.tribe = res;
        });
        this.tribeService.getTribeMembers(this.tribeID, 'members', res => {
            if (res.length > 0) {
                this.members = res[0].members;
            }
        });

        this.tribeService.getTribeMembers(this.tribeID, 'can-post', res => {
            if (res.length > 0) {
                this.canPost = res[0].canPost;
            }
        });

        this.tribeService.getTribeMembers(this.tribeID, 'can-comment', res => {
            if (res.length > 0) {
                this.canComment = res[0].canComment;
            }
        });

    }

    openDialog(whom) {
        const checked = whom === 'canPost' ? this.canPost : this.canComment;
        this.dialogRef = this.dialog.open(SelectUsersDialogComponent, {
            data: {
                members: this.members,
                whom: whom,
                checked: checked
            }
        });
        this.dialogRef.afterClosed().subscribe(upd => {
            if (!upd) {
                return;
            }
            let body;
            const result = JSON.parse(upd);
            if (whom === 'canPost') {
                this.canPost = result;
                body = {
                    canPost: result,
                    _id: this.tribeID
                };
            }
            if (whom === 'canComment') {
                this.canComment = result;
                body = {
                    canComment: result,
                    _id: this.tribeID
                };
            }
            this.tribeService.updateTribe(body, res => { });
        });
    }
}
