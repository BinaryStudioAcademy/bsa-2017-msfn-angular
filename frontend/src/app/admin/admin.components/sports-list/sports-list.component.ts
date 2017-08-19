import { SportsListService } from './sports-list.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sports-list',
  templateUrl: './sports-list.component.html',
  styleUrls: ['./sports-list.component.scss'],
  providers: [SportsListService]
})
export class SportsListComponent implements OnInit {

  data: any[];

  constructor(private sportsListService: SportsListService) { }

  ngOnInit() {
    this.sportsListService.getKindsOfSport((data) => {
      if (data.length === 1 && !data[0].code) {
        this.data = [];
      } else {
        this.data = data;
      }

    });
  }

}
