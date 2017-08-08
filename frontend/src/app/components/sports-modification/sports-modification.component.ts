import { Component, OnInit } from '@angular/core';
import { KindSport } from './sport-descr';
import {Sports } from './sports-kind';


@Component({
  selector: 'app-sports-modification',
  templateUrl: './sports-modification.component.html',
  styleUrls: ['./sports-modification.component.scss']
})

export class SportsModificationComponent  {
    sports = Sports;
    selectedSport:  KindSport;


    onSelect(sport: KindSport): void {
      console.log(sport);
      this.selectedSport = sport;
    }
}


