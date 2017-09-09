import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-achievements-list',
  templateUrl: './achievements-list.component.html',
  styleUrls: ['./achievements-list.component.scss']
})
export class AchievementsListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  openDialog(id) {
    console.log(id);
  }

}
