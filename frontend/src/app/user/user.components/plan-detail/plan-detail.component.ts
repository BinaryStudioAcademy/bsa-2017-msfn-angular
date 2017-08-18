import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.scss']
})
export class PlanDetailComponent implements OnInit {
  title = 'create';
  trainingsCount = 0;
  days = [
    { 'key': 'md', 'value': 'Monday' },
    { 'key': 'tu', 'value': 'Tuesday' },
    { 'key': 'wd', 'value': 'Wednesday' },
    { 'key': 'th', 'value': 'Thursday' },
    { 'key': 'fr', 'value': 'Friday' },
    { 'key': 'sa', 'value': 'Saturday' },
    { 'key': 'su', 'value': 'Sunday' }
  ];
  sportTypeValue: string;
  types = [
    {'value': 'run', 'viewValue': 'Run'},
    {'value': 'fitness', 'viewValue': 'Fitness'},
    {'value': 'loooong', 'viewValue': 'Tooooo long type name'},
  ];
  constructor() { }

  ngOnInit() {
  }
  changeTrainingCount(operation){
    if(operation == 'dec' && this.trainingsCount > 0){
      this.trainingsCount -= 1;
    } else if(operation == 'inc' && this.trainingsCount < 7){
      this.trainingsCount += 1;
    }

  }

}
