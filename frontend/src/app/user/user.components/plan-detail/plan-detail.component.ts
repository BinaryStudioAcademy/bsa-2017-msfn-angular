import { Component, OnInit, ViewChild } from '@angular/core';
import { ExerciseEditDialogComponent } from './../exercise-edit-dialog/exercise-edit-dialog.component';
import { IntervalTrainingPlanComponent } from './../interval-training-plan/interval-training-plan.component';
import { MdDialog, MdDialogRef } from '@angular/material';
import { IHttpReq } from './../../../models/http-req';
import { HttpService } from '../../../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { ExerciseListComponent } from './../exercise-list/exercise-list.component';


@Component({
    selector: 'app-plan-detail',
    templateUrl: './plan-detail.component.html',
    styleUrls: ['./plan-detail.component.scss']
})

export class PlanDetailComponent implements OnInit {

@ViewChild(ExerciseListComponent) exercisesListComponent: ExerciseListComponent;
    title = 'Training plan create';
    trainingsCount = 0;
    exercisesList = [];

    days = [
        { 'key': '1', 'value': 'Mon', 'checked': false },
        { 'key': '2', 'value': 'Tue', 'checked': false },
        { 'key': '3', 'value': 'Wed', 'checked': false },
        { 'key': '4', 'value': 'Thu', 'checked': false },
        { 'key': '5', 'value': 'Fri', 'checked': false },
        { 'key': '6', 'value': 'Sat', 'checked': false },
        { 'key': '0', 'value': 'Sun', 'checked': false }
    ];

    // sportTypeValue doesn't use.. ?
    sportTypeValue: string;
    searchString: string = 'Coming soon...';

    types = [
        {
            key: 'general',
            value: 'General training',
            checked: false
        },
        {
            key: 'interval',
            value: 'Interval training',
            checked: false
        },
    ];

    displayExercises: Object[];

    // pager props
    // pageSize = 3;
    // pageIndex = 0;
    // paginatorLength: Number;
    // pageEvent: PageEvent;


    lastAfterClosedResult: string;

    trainingPlan = {
        _id: '',
        name: 'New plan',
        days: [],
        count: 0,
        trainingType: 'general' || 'interval',
        exercisesList: [],
        intervals: [],
    };


    constructor(
        private dialog: MdDialog,
        // private paginator: MdPaginatorModule,
        private httpHandler: HttpService,
        public activatedRoute: ActivatedRoute) {
        // this.openedDialog = null;

    }

    ngOnInit() {

        if (this.activatedRoute.snapshot.params.id) {
            const planID = this.activatedRoute.snapshot.params.id;
            const sendData: IHttpReq = {
                url: `/api/training-plan/` + planID,
                method: 'GET',
                body: '',
                successMessage: '',
            };

            this.httpHandler.sendRequest(sendData)
                .then((res) => {
                    if (res) {
                        this.trainingPlan = res[0];
                        this.trainingPlan.days.forEach((el) => {
                            this.days.forEach((day) => {
                                if (day.key === el.key) {
                                    day.checked = true;
                                }
                            });
                        });
                        this.types.forEach((type) => {
                            if (type.key === this.trainingPlan.trainingType) {
                                type.checked = true;
                            }
                        });
                        // this.exercisesListComponent.exercisesList = this.trainingPlan.exercisesList;
                        this.exercisesListComponent.showPage(0);
                        // console.log(this.types);
                        // this.paginatorLength = this.trainingPlan.exercisesList.length;
                    }
                });
        }

    }

    selectDays() {
        const selectedDays = this.days.filter((el) => {
            return el.checked;
        });
        this.trainingPlan.days = selectedDays;
        this.trainingPlan.count = selectedDays.length;
    }

    changeTrainingCount(newValue: string, operation = '') {
        if (!newValue) {
            switch (operation) {
                case 'dec':
                    if (this.trainingPlan.count > 0) {
                        this.trainingPlan.count -= 1;
                    }
                    break;
                case 'inc':
                    if (this.trainingPlan.count < 7) {
                        this.trainingPlan.count += 1;
                    }
                    break;
            }
        } else {
            if (parseInt(newValue, 10)) {

                this.trainingPlan.count = parseInt(newValue, 10);
            }
        }

        if (this.trainingPlan.count > 7) {
            this.trainingPlan.count = 7;
        } else if (this.trainingPlan.count < 0) {
            this.trainingPlan.count = 0;
        }
        // console.log(this.trainingPlan.count);
    }

    // addExercise() {
    //     this.searchDialog = this.dialog.open(SearchExerciseComponent, {
    //         data: {
    //             currentExercises: this.trainingPlan.exercisesList
    //         }
    //     });
    //     this.searchDialog.afterClosed().subscribe((result: string) => {
    //         this.lastAfterClosedResult = result;
    //         let selectedExercises = this.searchDialog.componentInstance.selectedExercises;

    //         this.addExercises(selectedExercises);
    //         this.searchDialog = null;
    //     });

    // }

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
        //     this.openedDialog = this.dialog.open(IntervalTrainingPlanComponent);
        // else
        //     this.openedDialog = this.dialog.open(ExerciseEditDialogComponent);
    }
    showPage(currentPage) {
        const startInd = currentPage * 3;
        this.displayExercises = this.trainingPlan.exercisesList.slice(startInd, startInd + 3);
    }

    // addExercises(exercises) {
    //     exercises.forEach((elem, ind) => {
    //         let inArray = this.trainingPlan.exercisesList.find((el) => {
    //             return el._id === elem.id;
    //         });
    //         if (!inArray) {
    //             this.trainingPlan.exercisesList.push(elem);
    //         }
    //     });
    //     let page = 0;
    //     if (this.pageEvent) {
    //         page = this.pageEvent.pageIndex;
    //     }
    //     this.showPage(page);
    // }

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

    savePlan() {
      this.trainingPlan.exercisesList = this.exercisesListComponent.exercisesList;
        this.trainingPlan.exercisesList.forEach((item: any) => {
            item.id = item._id;
            // delete item._id;
        });
        const sendData: IHttpReq = {
            url: `/api/training-plan`,
            method: 'POST',
            body: this.trainingPlan,
            successMessage: 'Plan created',
        };
        if (this.trainingPlan._id.length) {
            sendData.method = 'PUT';
            sendData.successMessage = 'Plan saved';
            sendData.url += '/' + this.trainingPlan._id;
        } else {
        }
        this.httpHandler.sendRequest(sendData)
            .then((res) => {
                if (res) {
                    if (!res.nModified) {
                        this.trainingPlan._id = res._id;
                    }
                }
            });
    }
}
