import { MdDialog, MdDialogRef } from '@angular/material';
import { SelectUsersDialogComponent } from './../../../../select-users-dialog/select-users-dialog.component';
import { Router } from '@angular/router';
import { TribeService } from './../../../tribe.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tribe-banlist',
    templateUrl: './tribe-banlist.component.html',
    styleUrls: ['./tribe-banlist.component.scss'],
    providers: [TribeService]
})
export class TribeBanlistComponent implements OnInit {
    tribeID: any;
    tribe: any;
    members = [];
    banned = [];
    dialogRef: MdDialogRef<any>;
    constructor(private tribeService: TribeService,
        private dialog: MdDialog,
        private router: Router) { }

    ngOnInit() {
        this.tribeID = this.router.url.split('/banlist')[0].split('tribe-settings/').pop();
        this.tribeService.getTribe(this.tribeID, res => {
            this.tribe = res;
        });
        this.tribeService.getTribeMembers(this.tribeID, 'members', res => {
            if (res.length > 0) {
                this.members = res[0].members;
            }
        });

        this.tribeService.getTribeMembers(this.tribeID, 'banlist', res => {

            if (res.length > 0) {
                this.banned = res[0].banned;
            }
        });

    }

    openDialog() {
        this.dialogRef = this.dialog.open(SelectUsersDialogComponent, {
            data: {
                members: this.members,
                checked: this.banned
            }
        });
        this.dialogRef.afterClosed().subscribe(upd => {
            if (!upd) {
                return;
            }
            this.banned = JSON.parse(upd);
            const body = {
                banned: this.banned,
                _id: this.tribeID
            };
            this.tribeService.updateTribe(body, res => { });
        });
    }
}
