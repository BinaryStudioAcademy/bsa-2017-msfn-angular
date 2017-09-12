import { MD_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
    selector: 'app-achievement-received-dialog',
    templateUrl: './achievement-received-dialog.component.html',
    styleUrls: ['./achievement-received-dialog.component.scss']
})
export class AchievementReceivedDialogComponent implements OnInit {

    constructor(
        @Inject(MD_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() {
    }

}
