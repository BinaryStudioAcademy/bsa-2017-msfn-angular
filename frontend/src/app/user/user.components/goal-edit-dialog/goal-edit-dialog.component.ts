import { MD_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-goal-edit-dialog',
  templateUrl: './goal-edit-dialog.component.html',
  styleUrls: ['./goal-edit-dialog.component.scss']
})
export class GoalEditDialogComponent implements OnInit {

    constructor(
        @Inject(MD_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() {
        console.log(this.data);
    }

}
