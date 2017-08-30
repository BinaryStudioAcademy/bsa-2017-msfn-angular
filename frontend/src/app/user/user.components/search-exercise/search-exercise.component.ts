import { Component, Inject, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { IHttpReq } from './../../../models/http-req';
import { HttpService } from '../../../services/http.service';
import { ExerciseDescriptionComponent } from '../exercise-description/exercise-description.component';

@Component({
    selector: 'app-search-exercise',
    templateUrl: './search-exercise.component.html',
    styleUrls: ['./search-exercise.component.scss']
})
export class SearchExerciseComponent implements OnInit {

    sportTypeValue: string;
    exercsesShow = false;

    exercisesList = [];
    constExercisesList = [];
    types = [];

    selectedExercises = []; // todo extend exercise interface

    constructor(
        private dialogRef: MdDialogRef<SearchExerciseComponent>,
        private dialog: MdDialog,
        @Inject(MD_DIALOG_DATA) public data: any,
        private httpHandler: HttpService,
    ) { }

    ngOnInit() {
        // get sport types

        const sendData: IHttpReq = {
            url: '/api/exercise-type/',
            method: 'GET',
            body: {},
            successMessage: '',
        };

        this.httpHandler.sendRequest(sendData)
            .then((res) => {
                if (res) {
                    this.types = res;
                }
            });
        // send message()
    }

    getExercises() {
        const sendData: IHttpReq = {
            url: `/api/exercise/type/${this.sportTypeValue}`,
            method: 'GET',
            body: {},
            successMessage: '',
        };

        this.httpHandler.sendRequest(sendData)
            .then((res) => {
                if (res) {
                    this.exercisesList = this.removeCheckedExercise(res);
                    this.constExercisesList = this.exercisesList;
                }
            });
        this.exercsesShow = true;

    }

    selectExercise(event) {
        const exerciseID = event.source.id;

        const exercise = this.exercisesList.find(function (el) {
            return el._id === exerciseID;
        });
        const exerciseInList = this.selectedExercises.findIndex(function (el) {
            return el._id === exerciseID;
        });
        if (event.source.checked) {
            this.selectedExercises.push(exercise);
        } else {
            this.selectedExercises = this.selectedExercises.filter(function (el) {
                return el._id !== exerciseID;
            });
        }
    }

    showDescription(exerciseObj) {
        this.dialog.open(ExerciseDescriptionComponent, {
            data: exerciseObj
        });
    }

    removeCheckedExercise(exercisesList) {
        const listOfChekedExercise = [];
        this.data.currentExercises.forEach( el => {
            listOfChekedExercise.push(el.exercise._id);
        });
        return exercisesList.filter(el => {
            return !listOfChekedExercise.includes(el._id);
        });
    }

    onSearch(value) {
        this.exercisesList = this.constExercisesList.filter(el => {
            return el.name.toLowerCase().includes(value.toLowerCase());
        });
    }
}
