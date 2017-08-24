import { Component, Inject, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-search-exercise',
  templateUrl: './search-exercise.component.html',
  styleUrls: ['./search-exercise.component.scss']
})
export class SearchExerciseComponent implements OnInit {

  sportTypeValue: string;
  searchString: string = 'Coming soon...';
  exercsesShow = false;
  exercisesList = [
    {
      id: 123,
      order: 1,
      name: 'Braced Squat',
      type: 'fitness',
      // tslint:disable-next-line:max-line-length
      description: 'It\'s one of the simplest yet most effective ways to tighten your tummy. In fact, you\'ll barely have to move a muscle.',
      how_to: 'Assume a pushup position with your arms completely straight, but place your hands on a Swiss ball instead of the floor. Your body should form a straight line from your head to your ankles. Tighten your core and hold it that way for the duration of the exercise [A]. Lift one foot off the floor and slowly raise your knee as close to your chest as you can without changing your lower-back posture. Then repeat with your other leg. Alternate back and forth for 30 seconds. If that\'s too hard, place your hands on the floor or a bench, instead of a Swiss ball.'
    },
    {
      id: 1912,
      name: 'Biceps Curls With SZ-bar',
      type: 'fitness',
      // tslint:disable-next-line:max-line-length
      description: 'Holding a weight on just one side of your body increases the demand placed on your core to keep your body stable. The result: Your hips and abs have to work harder, and you\'ll also improve your balance. And better yet, you\'ll burn tons of calories.',
      how_to: 'Hold the SZ-bar shoulder-wide, the back is straight, the shoulders slightly back, the arms are streched. Bend the arms, bringing the weight up, with a fast movement. Without pausing, let down the bar with a slow and controlled movement.Don\'t allow your body to swing during the exercise, all work is done by the biceps, which are the only mucles that should move (pay attention to the elbows).'
    },
    {
      id: 12113,
      name: 'Braced Squat',
      type: 'fitness',
      // tslint:disable-next-line:max-line-length
      description: 'It\'s one of the simplest yet most effective ways to tighten your tummy. In fact, you\'ll barely have to move a muscle.',
      how_to: 'Assume a pushup position with your arms completely straight, but place your hands on a Swiss ball instead of the floor. Your body should form a straight line from your head to your ankles. Tighten your core and hold it that way for the duration of the exercise [A]. Lift one foot off the floor and slowly raise your knee as close to your chest as you can without changing your lower-back posture. Then repeat with your other leg. Alternate back and forth for 30 seconds. If that\'s too hard, place your hands on the floor or a bench, instead of a Swiss ball.'
    },
    {
      id: 172,
      name: 'Biceps Curls With SZ-bar',
      type: 'fitness',
      // tslint:disable-next-line:max-line-length
      description: 'Holding a weight on just one side of your body increases the demand placed on your core to keep your body stable. The result: Your hips and abs have to work harder, and you\'ll also improve your balance. And better yet, you\'ll burn tons of calories.',
      how_to: 'Hold the SZ-bar shoulder-wide, the back is straight, the shoulders slightly back, the arms are streched. Bend the arms, bringing the weight up, with a fast movement. Without pausing, let down the bar with a slow and controlled movement.Don\'t allow your body to swing during the exercise, all work is done by the biceps, which are the only mucles that should move (pay attention to the elbows).'
    },
    {
      id: 1213,
      name: 'Braced Squat',
      type: 'fitness',
      // tslint:disable-next-line:max-line-length
      description: 'It\'s one of the simplest yet most effective ways to tighten your tummy. In fact, you\'ll barely have to move a muscle.',
      how_to: 'Assume a pushup position with your arms completely straight, but place your hands on a Swiss ball instead of the floor. Your body should form a straight line from your head to your ankles. Tighten your core and hold it that way for the duration of the exercise [A]. Lift one foot off the floor and slowly raise your knee as close to your chest as you can without changing your lower-back posture. Then repeat with your other leg. Alternate back and forth for 30 seconds. If that\'s too hard, place your hands on the floor or a bench, instead of a Swiss ball.'
    },
    {
      id: 142,
      name: 'Biceps Curls With SZ-bar',
      type: 'fitness',
      // tslint:disable-next-line:max-line-length
      description: 'Holding a weight on just one side of your body increases the demand placed on your core to keep your body stable. The result: Your hips and abs have to work harder, and you\'ll also improve your balance. And better yet, you\'ll burn tons of calories.',
      how_to: 'Hold the SZ-bar shoulder-wide, the back is straight, the shoulders slightly back, the arms are streched. Bend the arms, bringing the weight up, with a fast movement. Without pausing, let down the bar with a slow and controlled movement.Don\'t allow your body to swing during the exercise, all work is done by the biceps, which are the only mucles that should move (pay attention to the elbows).'
    },
    {
      id: 1253,
      name: 'Braced Squat',
      type: 'fitness',
      // tslint:disable-next-line:max-line-length
      description: 'It\'s one of the simplest yet most effective ways to tighten your tummy. In fact, you\'ll barely have to move a muscle.',
      how_to: 'Assume a pushup position with your arms completely straight, but place your hands on a Swiss ball instead of the floor. Your body should form a straight line from your head to your ankles. Tighten your core and hold it that way for the duration of the exercise [A]. Lift one foot off the floor and slowly raise your knee as close to your chest as you can without changing your lower-back posture. Then repeat with your other leg. Alternate back and forth for 30 seconds. If that\'s too hard, place your hands on the floor or a bench, instead of a Swiss ball.'
    },
    {
      id: 1182,
      name: 'Biceps Curls With SZ-bar',
      type: 'fitness',
      // tslint:disable-next-line:max-line-length
      description: 'Holding a weight on just one side of your body increases the demand placed on your core to keep your body stable. The result: Your hips and abs have to work harder, and you\'ll also improve your balance. And better yet, you\'ll burn tons of calories.',
      how_to: 'Hold the SZ-bar shoulder-wide, the back is straight, the shoulders slightly back, the arms are streched. Bend the arms, bringing the weight up, with a fast movement. Without pausing, let down the bar with a slow and controlled movement.Don\'t allow your body to swing during the exercise, all work is done by the biceps, which are the only mucles that should move (pay attention to the elbows).'
    },
    {
      id: 1223,
      name: 'Braced Squat',
      type: 'fitness',
      // tslint:disable-next-line:max-line-length
      description: 'It\'s one of the simplest yet most effective ways to tighten your tummy. In fact, you\'ll barely have to move a muscle.',
      how_to: 'Assume a pushup position with your arms completely straight, but place your hands on a Swiss ball instead of the floor. Your body should form a straight line from your head to your ankles. Tighten your core and hold it that way for the duration of the exercise [A]. Lift one foot off the floor and slowly raise your knee as close to your chest as you can without changing your lower-back posture. Then repeat with your other leg. Alternate back and forth for 30 seconds. If that\'s too hard, place your hands on the floor or a bench, instead of a Swiss ball.'
    },
    {
      id: 1122,
      name: 'Biceps Curls With SZ-bar',
      type: 'fitness',
      // tslint:disable-next-line:max-line-length
      description: 'Holding a weight on just one side of your body increases the demand placed on your core to keep your body stable. The result: Your hips and abs have to work harder, and you\'ll also improve your balance. And better yet, you\'ll burn tons of calories.',
      how_to: 'Hold the SZ-bar shoulder-wide, the back is straight, the shoulders slightly back, the arms are streched. Bend the arms, bringing the weight up, with a fast movement. Without pausing, let down the bar with a slow and controlled movement.Don\'t allow your body to swing during the exercise, all work is done by the biceps, which are the only mucles that should move (pay attention to the elbows).'
    },
  ];

  types = [
    { 'value': 'run', 'viewValue': 'Run' },
    { 'value': 'fitness', 'viewValue': 'Fitness' },
    { 'value': 'loooong', 'viewValue': 'Tooooo long type name' },
  ];

  selectedExercises = []; // todo extend exercise interface


  constructor(private dialogRef: MdDialogRef<SearchExerciseComponent>, @Inject(MD_DIALOG_DATA) public data: any) {
    console.log(data);
  }

  ngOnInit() {
    // get sport types
  }

  getExercises() {
    this.exercsesShow = true;
  }

  selectExercise(event) {
    const exerciseID = event.source.id;

    const exercise = this.exercisesList.find(function (el) {
      return el.id === exerciseID;
    });
    console.log(exercise);
    const exerciseInList = this.selectedExercises.findIndex(function (el) {
      return el.id === exerciseID;
    });
    if (event.source.checked) {
      this.selectedExercises.push(exercise);
    } else {
      this.selectedExercises = this.selectedExercises.filter(function (el) {
        return el.id !== exerciseID;
      });
    }
    console.log(this.selectedExercises);
  }
}
