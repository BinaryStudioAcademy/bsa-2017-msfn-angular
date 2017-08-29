import { GoalService } from './goal.service';
import { MdDialogRef, MdDialog } from '@angular/material';
import { GoalEditDialogComponent } from './../goal-edit-dialog/goal-edit-dialog.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.scss'],
  providers: [GoalService]
})
export class GoalComponent implements OnInit {

  dialogRef: MdDialogRef<any>;
  data: any;

  constructor(private dialog: MdDialog, private goalService: GoalService) { }

  ngOnInit() {
         this.goalService.getData((data) => {
           this.data = data;
         });
  }

  openDialog(item) {
    this.dialogRef = this.dialog.open(GoalEditDialogComponent, {
      data: {
        item: item,
      }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
         this.goalService.getData((data) => {
           this.data = data;
         });
      }
    });
  }


  getData() {

  };
}
