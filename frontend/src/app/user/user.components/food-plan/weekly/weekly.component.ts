import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.scss']
})
export class WeeklyComponent implements OnInit {

  days = [
    {
      name: 'Monday',
      selected: false
    },
    {
      name: 'Tuesday',
      selected: false
    },
    {
      name: 'Wednesday',
      selected: false
    },
    {
      name: 'Thursday',
      selected: false
    },
    {
      name: 'Friday',
      selected: false
    },
    {
      name: 'Saturday',
      selected: false
    },
    {
      name: 'Sunday',
      selected: false
    }
  ];

  constructor() { }

  ngOnInit() {
  }
  
  selectDay(dayName) {
    this.days.forEach((day: any) => {
      if (day.name === dayName) {
        day.selected = true;
      } else {
        day.selected = false;
      }
    });

  }

}
