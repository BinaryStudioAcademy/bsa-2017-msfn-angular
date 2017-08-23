import { Component, OnInit } from '@angular/core';
import { PageEvent, MdPaginatorModule } from '@angular/material';
import { SearchExerciseComponent } from './../search-exercise/search-exercise.component';
import { ExerciseEditDialogComponent } from './../exercise-edit-dialog/exercise-edit-dialog.component';
import { IntervalTrainingPlanComponent } from './../interval-training-plan/interval-training-plan.component';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.scss'],
  providers: [MdPaginatorModule],
})

export class PlanDetailComponent implements OnInit {
  private openedDialog: MdDialogRef<any> | null;
  private searchDialog: MdDialogRef<any> | null;

  title = 'Training plan create';
  trainingsCount = 0;

  days = [
    { 'key': 'md', 'value': 'Mon', 'checked': false },
    { 'key': 'tu', 'value': 'Tue', 'checked': false },
    { 'key': 'wd', 'value': 'Wed', 'checked': false },
    { 'key': 'th', 'value': 'Thu', 'checked': false },
    { 'key': 'fr', 'value': 'Fri', 'checked': false },
    { 'key': 'sa', 'value': 'Sat', 'checked': false },
    { 'key': 'su', 'value': 'Sun', 'checked': false }
  ];

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
  exercisesList = [];
  displayExercises: Object[];

  // pager props
  pageSize = 3;
  paginatorLength = this.exercisesList.length;
  pageIndex = 0;
  pageEvent: PageEvent;


  lastAfterClosedResult: string;

  trainingPlan = {
    name: 'New plan',
    days: [],
    count: Number,
    type: 'general' || 'interval',

  };

  constructor(private dialog: MdDialog, private paginator: MdPaginatorModule) {
    this.openedDialog = null;
  }

  ngOnInit() {


    this.exercisesList = [
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
        id: 1102,
        name: 'Biceps Curls With SZ-bar',
        type: 'fitness',
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
    this.displayExercises = this.exercisesList.slice(0, 3);
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

  addExercise() {
    this.searchDialog = this.dialog.open(SearchExerciseComponent, {
      data: {
        currentExercises: this.exercisesList
      }
    });
    this.searchDialog.afterClosed().subscribe((result: string) => {
      this.lastAfterClosedResult = result;
      let selectedExercises = this.searchDialog.componentInstance.selectedExercises;

      this.addExercises(selectedExercises);
      this.searchDialog = null;
    });

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

    // if (exercise.type == 'run')
    //   this.openedDialog = this.dialog.open(IntervalTrainingPlanComponent);
    // else
    //   this.openedDialog = this.dialog.open(ExerciseEditDialogComponent);
  }
  showPage(currentPage) {
    console.log(currentPage);
    const startInd = currentPage * 3;
    this.displayExercises = this.exercisesList.slice(startInd, startInd + 3);
  }

  addExercises(exercises) {
    exercises.forEach((elem, ind) => {
      let inArray = this.exercisesList.find((el) => {
        return el.id === elem.id;
      });
      if (!inArray) {
        this.exercisesList.push(elem);
      }
    });
    console.log(this.pageEvent);
    let page = 0;
    if (this.pageEvent) {
      page = this.pageEvent.pageIndex;
    }
    this.showPage(page);
  }

  setAdd(exercise) {
    this.displayExercises.forEach((item: any) => {
      item.edit = false;
    });
    this.exercisesList.forEach((item: any) => {
      item.edit = false;
    });
    exercise.edit = true;
  }

  setSaveInfo(exercise, form, i) {

    console.log(form);
    console.log(i);
    const newSet = {
      value: form.value.value,
      value2: form.value.value2
    };

    if (!exercise.sets) {
      exercise.sets = []
    }
    exercise.sets.push(newSet);
    form.value.value = '';
    form.value.value2 = '';
    exercise.edit = false;
  }
}
