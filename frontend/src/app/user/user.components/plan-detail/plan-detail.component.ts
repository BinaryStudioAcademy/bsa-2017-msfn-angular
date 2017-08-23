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

  displayExercises: Object[];

  // pager props
  pageSize = 3;
  pageIndex = 0;
  paginatorLength: Number;
  pageEvent: PageEvent;


  lastAfterClosedResult: string;

  trainingPlan = {
    name: 'New plan',
    days: [],
    count: Number,
    type: 'general' || 'interval',
    exercisesList: [],
  };

  constructor(private dialog: MdDialog, private paginator: MdPaginatorModule) {
    this.openedDialog = null;
  }

  ngOnInit() {
    if (this.trainingPlan.exercisesList.length) {
      this.paginatorLength = this.trainingPlan.exercisesList.length;
      this.displayExercises = this.trainingPlan.exercisesList.slice(0, 3);
    }
  }

  selectDays() {
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
        currentExercises: this.trainingPlan.exercisesList
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
    this.trainingPlan.exercisesList = this.trainingPlan.exercisesList.filter(function (el) {
      return el._id !== id;
    });

    this.displayExercises = this.trainingPlan.exercisesList.slice(0, 3);
  }
  editExercise(id) {
    const exercise = this.trainingPlan.exercisesList.find(function (el) {
      return el._id === id;
    });

    // if (exercise.type == 'run')
    //   this.openedDialog = this.dialog.open(IntervalTrainingPlanComponent);
    // else
    //   this.openedDialog = this.dialog.open(ExerciseEditDialogComponent);
  }
  showPage(currentPage) {
    console.log(currentPage);
    const startInd = currentPage * 3;
    this.displayExercises = this.trainingPlan.exercisesList.slice(startInd, startInd + 3);
  }

  addExercises(exercises) {
    console.log(exercises);
    exercises.forEach((elem, ind) => {
      let inArray = this.trainingPlan.exercisesList.find((el) => {
        return el._id === elem.id;
      });
      if (!inArray) {
        this.trainingPlan.exercisesList.push(elem);
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
    this.trainingPlan.exercisesList.forEach((item: any) => {
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
