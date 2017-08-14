import { TrainingListService } from './training-list.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss'],
  providers: [TrainingListService]
})
export class TrainingListComponent implements OnInit {

  data = [{
    name: 'Run'
  },
  {
    name: 'Bodybuilding'
  },
  {
    name: 'Jumping'
  },
  {
    name: 'Run'
  },
  {
    name: 'Bodybuilding'
  },
  {
    name: 'Jumping'
  },
  {
    name: 'Run'
  },
  {
    name: 'Bodybuilding'
  },
  {
    name: 'Jumping'
  },
  {
    name: 'Run'
  },
  {
    name: 'Bodybuilding'
  },
  {
    name: 'Jumping'
  },
  {
    name: 'Run'
  },
  {
    name: 'Bodybuilding'
  },
  {
    name: 'Jumping'
  },
  {
    name: 'Run'
  },
  {
    name: 'Bodybuilding'
  },
  {
    name: 'Jumping'
  },
  {
    name: 'Run'
  },
  {
    name: 'Bodybuilding'
  },
  {
    name: 'Jumping'
  }];

  constructor(private trainingListService: TrainingListService) { }

  ngOnInit() {
  }

}
