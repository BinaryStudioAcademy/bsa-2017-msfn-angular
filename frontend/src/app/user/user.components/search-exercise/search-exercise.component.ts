import { Component, Inject, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { IHttpReq } from './../../../models/http-req';
import { HttpService } from '../../../services/http.service';
import { MarkdownService } from '../../../services/markdown.service';

@Component({
  selector: 'app-search-exercise',
  templateUrl: './search-exercise.component.html',
  styleUrls: ['./search-exercise.component.scss']
})
export class SearchExerciseComponent implements OnInit {

  sportTypeValue: string;
  searchString: string = 'Coming soon...';
  exercsesShow = false;

  exercisesList = [];
  types = [];

  selectedExercises = []; // todo extend exercise interface

  constructor(
    private dialogRef: MdDialogRef<SearchExerciseComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private httpHandler: HttpService,
    private markdownService: MarkdownService,
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
          this.exercisesList = res;

          // conver description to markdown
          this.exercisesList.forEach( el => {
            el.description = this.markdownService.convert(el.description);
          });
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
}
