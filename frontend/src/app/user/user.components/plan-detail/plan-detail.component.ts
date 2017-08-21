import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { SearchExerciseComponent } from './../search-exercise/search-exercise.component';
import { ExerciseEditDialogComponent } from './../exercise-edit-dialog/exercise-edit-dialog.component';
import { IntervalTrainingPlanComponent } from './../interval-training-plan/interval-training-plan.component';

import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.scss']
})
export class PlanDetailComponent implements OnInit {
  private openedDialog: MdDialogRef<any> | null;

  title = 'Training plan create';
  trainingsCount = 0;
  exercsesShow = false;


  days = [
    { 'key': 'md', 'value': 'Mon' },
    { 'key': 'tu', 'value': 'Tue' },
    { 'key': 'wd', 'value': 'Wed' },
    { 'key': 'th', 'value': 'Thu' },
    { 'key': 'fr', 'value': 'Fri' },
    { 'key': 'sa', 'value': 'Sat' },
    { 'key': 'su', 'value': 'Sun' }
  ];

  /*days = [
    { 'key': 'md', 'value': 'Monday' },
    { 'key': 'tu', 'value': 'Tuesday' },
    { 'key': 'wd', 'value': 'Wednesday' },
    { 'key': 'th', 'value': 'Thursday' },
    { 'key': 'fr', 'value': 'Friday' },
    { 'key': 'sa', 'value': 'Saturday' },
    { 'key': 'su', 'value': 'Sunday' }
  ]; */

  sportTypeValue: string;
  searchString: string = 'Coming soon...';

  types = [
    { 'value': 'run', 'viewValue': 'Run' },
    { 'value': 'fitness', 'viewValue': 'Fitness' },
    { 'value': 'loooong', 'viewValue': 'Tooooo long type name' },
  ];

  exercisesList = [
    {
      id: 123,
      order: 1,
      name: 'Braced Squat',
      type: 'run',
      description: 'It\'s one of the simplest yet most effective ways to tighten your tummy. In fact, you\'ll barely have to move a muscle.',
      how_to: 'Assume a pushup position with your arms completely straight, but place your hands on a Swiss ball instead of the floor. Your body should form a straight line from your head to your ankles. Tighten your core and hold it that way for the duration of the exercise [A]. Lift one foot off the floor and slowly raise your knee as close to your chest as you can without changing your lower-back posture. Then repeat with your other leg. Alternate back and forth for 30 seconds. If that\'s too hard, place your hands on the floor or a bench, instead of a Swiss ball.'
    },
    {
      id: 112,
      name: 'Biceps Curls With SZ-bar',
      type: 'fitness',
      sets: [
        {
          weight: 30,
          repeat: 5,
        },
        {
          weight: 40,
          repeat: 5,
        },
        {
          weight: 45,
          repeat: 5,
        },

      ],
      description: 'Holding a weight on just one side of your body increases the demand placed on your core to keep your body stable. The result: Your hips and abs have to work harder, and you\'ll also improve your balance. And better yet, you\'ll burn tons of calories.',
      how_to: '<p>Hold the SZ-bar shoulder-wide, the back is straight, the shoulders slightly back, the arms are streched. Bend the arms, bringing the weight up, with a fast movement. Without pausing, let down the bar with a slow and controlled movement.</p>\n<p>Don\'t allow your body to swing during the exercise, all work is done by the biceps, which are the only mucles that should move (pay attention to the elbows).</p>'
    },
    {
      id: 1112,
      order: 1,
      name: 'Braced Squat',
      type: 'fitness',
      description: 'It\'s one of the simplest yet most effective ways to tighten your tummy. In fact, you\'ll barely have to move a muscle.',
      how_to: 'Assume a pushup position with your arms completely straight, but place your hands on a Swiss ball instead of the floor. Your body should form a straight line from your head to your ankles. Tighten your core and hold it that way for the duration of the exercise [A]. Lift one foot off the floor and slowly raise your knee as close to your chest as you can without changing your lower-back posture. Then repeat with your other leg. Alternate back and forth for 30 seconds. If that\'s too hard, place your hands on the floor or a bench, instead of a Swiss ball.'
    },
    {
      id: 1122,
      name: 'Biceps Curls With SZ-bar',
      type: 'fitness',
      sets: [
        {
          weight: 30,
          repeat: 5,
        },
        {
          weight: 40,
          repeat: 5,
        },
        {
          weight: 45,
          repeat: 5,
        },

      ],
      description: 'Holding a weight on just one side of your body increases the demand placed on your core to keep your body stable. The result: Your hips and abs have to work harder, and you\'ll also improve your balance. And better yet, you\'ll burn tons of calories.',
      how_to: '<p>Hold the SZ-bar shoulder-wide, the back is straight, the shoulders slightly back, the arms are streched. Bend the arms, bringing the weight up, with a fast movement. Without pausing, let down the bar with a slow and controlled movement.</p>\n<p>Don\'t allow your body to swing during the exercise, all work is done by the biceps, which are the only mucles that should move (pay attention to the elbows).</p>'
    },
    {
      id: 1253,
      order: 1,
      name: 'Braced Squat',
      type: 'fitness',
      description: 'It\'s one of the simplest yet most effective ways to tighten your tummy. In fact, you\'ll barely have to move a muscle.',
      how_to: 'Assume a pushup position with your arms completely straight, but place your hands on a Swiss ball instead of the floor. Your body should form a straight line from your head to your ankles. Tighten your core and hold it that way for the duration of the exercise [A]. Lift one foot off the floor and slowly raise your knee as close to your chest as you can without changing your lower-back posture. Then repeat with your other leg. Alternate back and forth for 30 seconds. If that\'s too hard, place your hands on the floor or a bench, instead of a Swiss ball.'
    },
    {
      id: 1812,
      name: 'Biceps Curls With SZ-bar',
      type: 'fitness',
      sets: [
        {
          weight: 30,
          repeat: 5,
        },
        {
          weight: 40,
          repeat: 5,
        },
        {
          weight: 45,
          repeat: 5,
        },

      ],
      description: 'Holding a weight on just one side of your body increases the demand placed on your core to keep your body stable. The result: Your hips and abs have to work harder, and you\'ll also improve your balance. And better yet, you\'ll burn tons of calories.',
      how_to: '<p>Hold the SZ-bar shoulder-wide, the back is straight, the shoulders slightly back, the arms are streched. Bend the arms, bringing the weight up, with a fast movement. Without pausing, let down the bar with a slow and controlled movement.</p>\n<p>Don\'t allow your body to swing during the exercise, all work is done by the biceps, which are the only mucles that should move (pay attention to the elbows).</p>'
    },
    {
      id: 1523,
      order: 1,
      name: 'Braced Squat',
      type: 'fitness',
      description: 'It\'s one of the simplest yet most effective ways to tighten your tummy. In fact, you\'ll barely have to move a muscle.',
      how_to: 'Assume a pushup position with your arms completely straight, but place your hands on a Swiss ball instead of the floor. Your body should form a straight line from your head to your ankles. Tighten your core and hold it that way for the duration of the exercise [A]. Lift one foot off the floor and slowly raise your knee as close to your chest as you can without changing your lower-back posture. Then repeat with your other leg. Alternate back and forth for 30 seconds. If that\'s too hard, place your hands on the floor or a bench, instead of a Swiss ball.'
    },
    {
      id: 112,
      name: 'Biceps Curls With SZ-bar',
      type: 'fitness',
      sets: [
        {
          weight: 30,
          repeat: 5,
        },
        {
          weight: 40,
          repeat: 5,
        },
        {
          weight: 45,
          repeat: 5,
        },

      ],
      description: 'Holding a weight on just one side of your body increases the demand placed on your core to keep your body stable. The result: Your hips and abs have to work harder, and you\'ll also improve your balance. And better yet, you\'ll burn tons of calories.',
      how_to: '<p>Hold the SZ-bar shoulder-wide, the back is straight, the shoulders slightly back, the arms are streched. Bend the arms, bringing the weight up, with a fast movement. Without pausing, let down the bar with a slow and controlled movement.</p>\n<p>Don\'t allow your body to swing during the exercise, all work is done by the biceps, which are the only mucles that should move (pay attention to the elbows).</p>'
    },
    {
      id: 1283,
      order: 1,
      name: 'Braced Squat',
      type: 'fitness',
      description: 'It\'s one of the simplest yet most effective ways to tighten your tummy. In fact, you\'ll barely have to move a muscle.',
      how_to: 'Assume a pushup position with your arms completely straight, but place your hands on a Swiss ball instead of the floor. Your body should form a straight line from your head to your ankles. Tighten your core and hold it that way for the duration of the exercise [A]. Lift one foot off the floor and slowly raise your knee as close to your chest as you can without changing your lower-back posture. Then repeat with your other leg. Alternate back and forth for 30 seconds. If that\'s too hard, place your hands on the floor or a bench, instead of a Swiss ball.'
    },
    {
      id: 1102,
      name: 'Biceps Curls With SZ-bar',
      type: 'fitness',
      sets: [
        {
          weight: 30,
          repeat: 5,
        },
        {
          weight: 40,
          repeat: 5,
        },
        {
          weight: 45,
          repeat: 5,
        },

      ],
      description: 'Holding a weight on just one side of your body increases the demand placed on your core to keep your body stable. The result: Your hips and abs have to work harder, and you\'ll also improve your balance. And better yet, you\'ll burn tons of calories.',
      how_to: '<p>Hold the SZ-bar shoulder-wide, the back is straight, the shoulders slightly back, the arms are streched. Bend the arms, bringing the weight up, with a fast movement. Without pausing, let down the bar with a slow and controlled movement.</p>\n<p>Don\'t allow your body to swing during the exercise, all work is done by the biceps, which are the only mucles that should move (pay attention to the elbows).</p>'
    },
    // {
    //   id: 233,
    //   name: 'glutes: hip raise',
    //   type: 'fitness',
    //   description: ' It targets the muscles of your rear end, which can help make your belly flatter. The reason: When your glutes are weak—as they are in most women—the top of your pelvis tilts forward. This not only places stress on your lower back, but it causes your tummy to stick out—even if you don\'t have an ounce of fat. Your fix: the hip raise.',
    //   how_to: 'Lie on your back on the floor with your knees bent and your feet flat on the floor [A]. Now brace your core, squeeze your glutes, and raise your hips so your body forms a straight line from your shoulders to your knees [B]. Pause for 3 to 5 seconds—squeezing your glutes tightly the entire time—then lower back to the start.'
    // },
    // {

    // {
    //   id: 443,
    //   name: 'HAMSTRINGS: SINGLE-LEG DUMBBELL STRAIGHT-LEG DEADLIFT',
    //   type: 'fitness',
    //   description: 'Besides targeting your hamstrings, this exercise works your glutes and core. It also helps eliminate muscle imbalances between your legs, reducing your risk of injury. And as a bonus, it can even improve the flexibility of your hamstrings.',
    //   how_to: 'Grab a pair of dumbbells with an overhand grip, and hold them at arm\'s length in front your thighs. Stand with your feet shoulder-width apart and knees slightly bent. Now raise one leg off the floor [A]. Without changing the bend in your knee, bend at your hips (keep your lower back arched), and lower your torso until it\'s almost parallel to the floor [B]. Pause, then squeeze your glutes, thrust your hips forward, and raise your torso back to the start. Do all your reps, then repeat with your other leg.'
    // },
  ];
  pageSize = 3;
  length = 10;
  page = 1;
  pageEvent: PageEvent;
  displayExercises: Object[];

  constructor(private dialog: MdDialog) {
    this.openedDialog = null;
  }

  ngOnInit() {
    this.displayExercises = this.exercisesList.slice(0, 3);
  }
  changeTrainingCount(newValue: string, operation = '') {
    console.log(operation);
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
      if (parseInt(newValue)) {
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

  getExercises() {
    this.exercsesShow = true;
  }

  addExercise() {
    this.openedDialog = this.dialog.open(SearchExerciseComponent);
  }

  deleteExercise(id) {
    this.exercisesList = this.exercisesList.filter(function (el) {
      return el.id !== id;
    });

    this.displayExercises = this.exercisesList.slice(0, 3);
  }
  editExercise(id) {
    const exercise = this.exercisesList.find(function (el) {
      return el.id === id;
    });
    console.log(exercise.type);
    if (exercise.type == 'run')
      this.openedDialog = this.dialog.open(IntervalTrainingPlanComponent);
    else
      this.openedDialog = this.dialog.open(ExerciseEditDialogComponent);

    // this.displayExercises = this.exercisesList.slice(0, 3);
  }

}
