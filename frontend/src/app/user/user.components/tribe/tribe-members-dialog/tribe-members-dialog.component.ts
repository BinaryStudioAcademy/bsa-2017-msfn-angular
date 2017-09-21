import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';
import {TribeService} from '../tribe.service';

@Component({
    selector: 'app-tribe-members-dialog',
    templateUrl: './tribe-members-dialog.component.html',
    styleUrls: ['./tribe-members-dialog.component.scss'],
    providers: [TribeService]
})
export class TribeMembersDialogComponent implements OnInit {
    public members;

    constructor(@Inject(MD_DIALOG_DATA) public data,
                private tribeService: TribeService) {}

    ngOnInit() {
        this.members = [];
        if (this.data) {
            for (const item of this.data) {
                this.tribeService.getUserById(item, (res) => {
                    this.members.push(res);
                });
            }
        }
    }
}
