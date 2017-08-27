import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { PageEvent, MdPaginatorModule } from '@angular/material';
import { SearchExerciseComponent } from './../search-exercise/search-exercise.component';
import { ExerciseDescriptionComponent } from '../exercise-description/exercise-description.component';

@Component({
    selector: 'app-exercise-list',
    templateUrl: './exercise-list.component.html',
    styleUrls: ['./exercise-list.component.scss'],
    providers: [MdPaginatorModule]
})
export class ExerciseListComponent implements OnInit {
    private openedDialog: MdDialogRef<any> | null;
    private searchDialog: MdDialogRef<any> | null;
    @ViewChild('container')
    container: ElementRef;
    value;
    value2;
    setItemEdit;

    @Input() exercisesList = [];
    @Input() userMeasures;
    @Output() onChangeList = new EventEmitter();
    displayExercises: Object[];
    // pager props
    pageSize = 3;
    paginatorLength = this.exercisesList.length;
    pageIndex = 0;
    pageEvent: PageEvent;
    lastAfterClosedResult: string;

    constructor(
        private dialog: MdDialog,
        private paginator: MdPaginatorModule,
    ) {
        this.openedDialog = null;
    }

    ngOnInit() {
        this.displayExercises = this.exercisesList.slice(0, this.pageSize);
        this.onResize();
    }

    onResize() {
        if (window.innerWidth > 610) {
            this.pageSize = Math.floor((this.container.nativeElement.offsetWidth - 30) / 240);
        } else {
            this.pageSize = 3;
        }
        this.showPage(0);
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
            this.onChangeList.emit(this.exercisesList);
        });
    }

    deleteExercise(id) {
        this.exercisesList = this.exercisesList.filter(function (el) {
            if (el.id) {
                return el.id !== id;
            } else if (el._id) {
                return el._id !== id;
            }
        });
        this.displayExercises = this.exercisesList.slice(0, this.pageSize);
        this.onChangeList.emit(this.exercisesList);
    }

    showPage(currentPage) {
        const startInd = currentPage * this.pageSize;
        this.displayExercises = this.exercisesList.slice(startInd, startInd + this.pageSize);
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

    setSaveInfo(exercise, form) {
        if (form.value.value && form.value.value2) {
            if (this.setItemEdit || this.setItemEdit === 0) {
                exercise.sets[this.setItemEdit].value = this.value;
                exercise.sets[this.setItemEdit].value2 = this.value2;
                this.setItemEdit = null;
            } else {
                const newSet = {
                    value: form.value.value,
                    value2: form.value.value2
                };

                if (!exercise.sets) {
                    exercise.sets = [];
                }

                exercise.sets.push(newSet);
            }
        }
        this.value = '';
        this.value2 = '';
        exercise.edit = false;
        this.onChangeList.emit(this.exercisesList);
    }

    setEdit(exercise, set, index) {
        this.setItemEdit = index;
        this.value = set.value;
        this.value2 = set.value2;
        exercise.edit = true;
    }

    setDelete(exercise, index) {
        exercise.sets.splice(index, 1);
    }

    showDescription(exercise) {
        this.dialog.open(ExerciseDescriptionComponent, {
            data: exercise
        });
    }

}
