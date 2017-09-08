import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-achivememts-list',
  templateUrl: './achivememts-list.component.html',
  styleUrls: ['./achivememts-list.component.scss']
})
export class AchivememtsListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  openDialog(id) {
    console.log(id);
  }

}
