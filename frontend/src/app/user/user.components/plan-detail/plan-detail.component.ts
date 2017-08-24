import { Component, OnInit } from '@angular/core';
import { ExerciseEditDialogComponent } from './../exercise-edit-dialog/exercise-edit-dialog.component';
import { IntervalTrainingPlanComponent } from './../interval-training-plan/interval-training-plan.component';

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.scss']
})

export class PlanDetailComponent implements OnInit {

  title = 'Training plan create';
  trainingsCount = 0;
  exercisesList = [];

  days = [
    { 'key': 'md', 'value': 'Mon', 'checked': false },
    { 'key': 'tu', 'value': 'Tue', 'checked': false },
    { 'key': 'wd', 'value': 'Wed', 'checked': false },
    { 'key': 'th', 'value': 'Thu', 'checked': false },
    { 'key': 'fr', 'value': 'Fri', 'checked': false },
    { 'key': 'sa', 'value': 'Sat', 'checked': false },
    { 'key': 'su', 'value': 'Sun', 'checked': false }
  ];

  // sportTypeValue doesn't use.. ?
  sportTypeValue: string;
  searchString: string = 'Coming soon...';

  types = [
    {
      key: 'general',
      value: 'General training'
    },
    {
      key: 'interval',
      value: 'Interval training'
    },
  ];

  lastAfterClosedResult: string;

  trainingPlan = {
    name: 'New plan',
    days: [],
    count: Number,
    type: 'general' || 'interval',

  };

  constructor() { }

  ngOnInit() {
    this.exercisesList = [
      {
        id: 123,
        order: 1,
        name: 'Braced Squat',
        type: 'run',
        // tslint:disable-next-line:max-line-length
        description: 'It\'s one of the simplest yet most effective ways to tighten your tummy. In fact, you\'ll barely have to move a muscle.',
        how_to: 'Assume a pushup position with your arms completely straight, but place your hands on a Swiss ball instead of the floor. Your body should form a straight line from your head to your ankles. Tighten your core and hold it that way for the duration of the exercise [A]. Lift one foot off the floor and slowly raise your knee as close to your chest as you can without changing your lower-back posture. Then repeat with your other leg. Alternate back and forth for 30 seconds. If that\'s too hard, place your hands on the floor or a bench, instead of a Swiss ball.'
      },
      {
        id: 112,
        name: 'Biceps Curls With SZ-bar',
        type: 'fitness',
        sets: [
          {
            value: '30 kg',
            value2: 'x5',
          },
          {
            value: '35 kg',
            value2: 'x5',
          },
          {
            value: '40 kg',
            value2: 'x5',
          },
        ],
        // tslint:disable-next-line:max-line-length
        description: 'Holding a weight on just one side of your body increases the demand placed on your core to keep your body stable. The result: Your hips and abs have to work harder, and you\'ll also improve your balance. And better yet, you\'ll burn tons of calories.',
        how_to: '<p>Hold the SZ-bar shoulder-wide, the back is straight, the shoulders slightly back, the arms are streched. Bend the arms, bringing the weight up, with a fast movement. Without pausing, let down the bar with a slow and controlled movement.</p>\n<p>Don\'t allow your body to swing during the exercise, all work is done by the biceps, which are the only mucles that should move (pay attention to the elbows).</p>'
      },
      {
        id: 1112,
        order: 1,
        name: 'Braced Squat',
        type: 'fitness',
        // tslint:disable-next-line:max-line-length
        description: 'It\'s one of the simplest yet most effective ways to tighten your tummy. In fact, you\'ll barely have to move a muscle.',
        how_to: 'Assume a pushup position with your arms completely straight, but place your hands on a Swiss ball instead of the floor. Your body should form a straight line from your head to your ankles. Tighten your core and hold it that way for the duration of the exercise [A]. Lift one foot off the floor and slowly raise your knee as close to your chest as you can without changing your lower-back posture. Then repeat with your other leg. Alternate back and forth for 30 seconds. If that\'s too hard, place your hands on the floor or a bench, instead of a Swiss ball.'
      },
      {
        id: 1102,
        name: 'Biceps Curls With SZ-bar',
        type: 'fitness',
      },
      {
        id: 233,
        name: 'glutes: hip raise',
        type: 'fitness',
        // tslint:disable-next-line:max-line-length
        description: ' It targets the muscles of your rear end, which can help make your belly flatter. The reason: When your glutes are weak—as they are in most women—the top of your pelvis tilts forward. This not only places stress on your lower back, but it causes your tummy to stick out—even if you don\'t have an ounce of fat. Your fix: the hip raise.',
        how_to: 'Lie on your back on the floor with your knees bent and your feet flat on the floor [A]. Now brace your core, squeeze your glutes, and raise your hips so your body forms a straight line from your shoulders to your knees [B]. Pause for 3 to 5 seconds—squeezing your glutes tightly the entire time—then lower back to the start.'
      },
      {
        id: 443,
        name: 'HAMSTRINGS: SINGLE-LEG DUMBBELL STRAIGHT-LEG DEADLIFT',
        type: 'fitness',
        // tslint:disable-next-line:max-line-length
        description: 'Besides targeting your hamstrings, this exercise works your glutes and core. It also helps eliminate muscle imbalances between your legs, reducing your risk of injury. And as a bonus, it can even improve the flexibility of your hamstrings.',
        how_to: 'Grab a pair of dumbbells with an overhand grip, and hold them at arm\'s length in front your thighs. Stand with your feet shoulder-width apart and knees slightly bent. Now raise one leg off the floor [A]. Without changing the bend in your knee, bend at your hips (keep your lower back arched), and lower your torso until it\'s almost parallel to the floor [B]. Pause, then squeeze your glutes, thrust your hips forward, and raise your torso back to the start. Do all your reps, then repeat with your other leg.'
      },
    ];
  }

  selectDays() {
    // console.log(this.days);
    const selectedDays = this.days.filter((el) => {
      return el.checked;
    });
    console.log(selectedDays);
    this.trainingPlan.days = selectedDays;
    this.trainingsCount = selectedDays.length;
  }

  changeTrainingCount(newValue: string, operation = '') {
    if (!newValue) {
      switch (operation) {
        case 'dec':
          if (this.trainingsCount > 0) {
            this.trainingsCount -= 1;
          }
          break;
        case 'inc':
          if (this.trainingsCount < 7) {
            this.trainingsCount += 1;
          }
          break;
      }
    } else {
      // tslint:disable-next-line:radix
      if (parseInt(newValue)) {
        // tslint:disable-next-line:radix
        this.trainingsCount = parseInt(newValue);
      }
    }

    if (this.trainingsCount > 7) {
      this.trainingsCount = 7;
    } else if (this.trainingsCount < 0) {
      this.trainingsCount = 0;
    }
    console.log(this.trainingsCount);
  }
}
