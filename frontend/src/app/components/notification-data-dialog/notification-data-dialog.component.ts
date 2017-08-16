import { Component, OnInit, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MdDialog } from '@angular/material';

@Component({
  selector: 'app-notification-data-dialog',
  templateUrl: './notification-data-dialog.component.html',
  styleUrls: ['./notification-data-dialog.component.scss']
})
export class NotificationDataDialogComponent implements OnInit {

  constructor( @Inject(MD_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
