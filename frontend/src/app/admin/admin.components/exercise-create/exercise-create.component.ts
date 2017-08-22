import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpService } from '../../../services/http.service';

import { IExerciseType } from '../../../models/exerciseType';
import { ExerciseCreateService } from './exercise-create.service';
import IExercise = ExerciseApi.IExercise;

@Component({
    selector: 'app-exercise-create',
    templateUrl: './exercise-create.component.html',
    styleUrls: ['./exercise-create.component.scss']
})
export class ExerciseCreateComponent implements OnInit {
    exercise: IExercise = {
        name: '',
        type: '',
        isRemoved: false,
        sportsId: [],
        image: '',
        description: ''
    };
    titleType = 'Create';

    exTypes: [IExerciseType];

    constructor(public router: ActivatedRoute,
                private httpService: HttpService,
                private exerciseCreateService: ExerciseCreateService,) {
    }

    ngOnInit() {
        if (this.router.snapshot.params.id) {
            this.titleType = 'Edit';
            this.exerciseCreateService.getExerciseById(this.router.snapshot.params.id, (data) => {
                this.exercise = data;
            });
        }
        this.exerciseCreateService.getExerciseTypes((data) => {
            this.exTypes = data;
        });
    }

    save(form: NgForm) {
        if (form.valid) {
            if (this.router.snapshot.params.id) {
                this.exerciseCreateService.updateExercise(this.router.snapshot.params.id, this.exercise);
            } else {
                this.exerciseCreateService.sendExercise(this.exercise);
            }
        }
    }
}
