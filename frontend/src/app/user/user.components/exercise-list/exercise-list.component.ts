import { Component, OnInit, Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { PageEvent, MdPaginatorModule } from '@angular/material';
import { SearchExerciseComponent } from './../search-exercise/search-exercise.component';

@Component({
    selector: 'app-exercise-list',
    templateUrl: './exercise-list.component.html',
    styleUrls: ['./exercise-list.component.scss'],
    providers: [MdPaginatorModule]
})
export class ExerciseListComponent implements OnInit {
    private openedDialog: MdDialogRef<any> | null;
    private searchDialog: MdDialogRef<any> | null;

    @Input() exercisesList = [];
    displayExercises: Object[];
    // pager props
    pageSize = 3;
    paginatorLength = this.exercisesList.length;
    pageIndex = 0;
    pageEvent: PageEvent;
    lastAfterClosedResult: string;

    constructor(private dialog: MdDialog, private paginator: MdPaginatorModule) {
        this.openedDialog = null;
    }

    ngOnInit() {
      this.displayExercises = this.exercisesList.slice(0, 3);
    }

    addExercise() {
      this.searchDialog = this.dialog.open(SearchExerciseComponent, {
        data: {
          currentExercises: this.exercisesList
        }
      });
      this.searchDialog.afterClosed().subscribe((result: string) => {
        this.lastAfterClosedResult = result;
        const selectedExercises = this.searchDialog.componentInstance.selectedExercises;

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
      const startInd = currentPage * 3;
      this.displayExercises = this.exercisesList.slice(startInd, startInd + 3);
    }

    addExercises(exercises) {
      exercises.forEach((elem, ind) => {
        const inArray = this.exercisesList.find((el) => {
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
            exercise.sets = [];
        }
        exercise.sets.push(newSet);
        form.value.value = '';
        form.value.value2 = '';
        exercise.edit = false;
    }

}
