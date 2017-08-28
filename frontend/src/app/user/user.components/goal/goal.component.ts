import { MdDialogRef, MdDialog } from '@angular/material';
import { GoalEditDialogComponent } from './../goal-edit-dialog/goal-edit-dialog.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.scss']
})
export class GoalComponent implements OnInit {

 dialogRef: MdDialogRef<any>;
 data = [
   {
     type: 'Increase weight',
     duration: '26.08.2017',
     count: 15
   },
   {
     type: 'Increase weight',
     duration: '26.08.2017',
     count: 15
   },
 ];

    constructor(private dialog: MdDialog) { }

    ngOnInit() {

    }

    openDialog(id: number) {
      this.dialogRef = this.dialog.open(GoalEditDialogComponent, { data: {
        id: id,
      } });
    }
}
