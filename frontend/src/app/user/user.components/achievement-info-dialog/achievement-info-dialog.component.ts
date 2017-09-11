import { MD_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
    selector: 'app-achievement-info-dialog',
    templateUrl: './achievement-info-dialog.component.html',
    styleUrls: ['./achievement-info-dialog.component.scss']
})
export class AchievementInfoDialogComponent implements OnInit {

    constructor(
        @Inject(MD_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() {
    }

}
