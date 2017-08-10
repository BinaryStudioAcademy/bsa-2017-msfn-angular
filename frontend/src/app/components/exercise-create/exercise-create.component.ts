import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-exercise-create',
  templateUrl: './exercise-create.component.html',
  styleUrls: ['./exercise-create.component.scss']
})
export class ExerciseCreateComponent implements OnInit {
  selectedValue: string;
  title: string;
  description: string;

  exercises = [
    { value: 'cardio', viewValue: 'Cardiovascular' },
    { value: 'strength', viewValue: 'Strength Training' },
  ];
  constructor(public router: ActivatedRoute) { }

  ngOnInit() {
    if (this.router.snapshot.params.id) {
      // get current exercise info;
      this.selectedValue = 'strength';
      this.title = 'New super power exercise';
      this.description = 'New super power exercise description';
    }
    // make some request to get exercises types
  }

  save(form: NgForm) {
    if (form.valid) {
      console.log(this.router.snapshot.params.id);
      console.log(this.selectedValue);
      console.log(this.title);
      console.log(this.description);
    }
  }

}
