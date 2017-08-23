import { Component, OnInit } from '@angular/core';
import { SetGoalsService } from './set-goals.service';

@Component({
  selector: 'app-set-goals',
  templateUrl: './set-goals.component.html',
  styleUrls: ['./set-goals.component.scss'],
  providers: [SetGoalsService]
})
export class SetGoalsComponent implements OnInit {
  selectedGoal;
  addNewGoal = false;
  goalsArr = [];

  goal = {
    name: '',
    description: '',
    deadline: '',
    currentWeight: '',
    aimWeight: ''

  };
  goals;
  constructor(private goalService: SetGoalsService) {
    this.goalsArr = goalService.data;

  }

  ngOnInit() {
    this.goalService.getGoals(data => {
      this.goals = data;
    });
  }

  onSelectAim(selectedAim) {
    console.log(typeof selectedAim);
  }

  saveGoal(selectedGoal) {
    this.goal.name = selectedGoal;
    this.addNewGoal = false;
    console.log(this.goal);

  }

  addGoal() {
    if (this.addNewGoal) {
      this.addNewGoal = false;
    } else {
      this.addNewGoal = true;
    }

  }
}
