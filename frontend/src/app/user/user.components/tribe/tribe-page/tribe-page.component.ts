import { Component, OnInit } from '@angular/core';
import { ITribe } from '../../../../models/tribe';
import { MdDialog } from '@angular/material';
import { TribeMembersDialogComponent } from '../tribe-members-dialog/tribe-members-dialog.component';

@Component({
  selector: 'app-tribe-page',
  templateUrl: './tribe-page.component.html',
  styleUrls: ['./tribe-page.component.scss']
})
export class TribePageComponent implements OnInit {
    tribe: ITribe = {
    name: 'Super Tribe',
    description: '**Description** Lorem ipsum dolor sit amet, consectetur adipiscing elit,\n' +
    '            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n' +
    '            quis nostrud exercitation ullamco laboris nisi ut aliquip',
    members: ['59b8c7ab52d7d41022a59e72', '59b8c7ab52d7d41022a59e77'],
    };
    posts = [1, 2, 3];

    constructor(private mdDialog: MdDialog) {
    }

    ngOnInit() {}

    showFollowers() {
        this.mdDialog.open(TribeMembersDialogComponent, {
            data: this.tribe.members
        });
         console.log(this.tribe.members);
    }
}
