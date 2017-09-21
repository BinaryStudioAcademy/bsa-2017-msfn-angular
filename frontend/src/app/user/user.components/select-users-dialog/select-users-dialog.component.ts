import { MD_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-select-users-dialog',
  templateUrl: './select-users-dialog.component.html',
  styleUrls: ['./select-users-dialog.component.scss']
})
export class SelectUsersDialogComponent implements OnInit {

    constructor(
        @Inject(MD_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit() {
      console.log(this.data);
  }

}
