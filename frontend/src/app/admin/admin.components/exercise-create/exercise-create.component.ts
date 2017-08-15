import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';
import { ExerciseCreateService } from './exercise-create.service';

@Component({
    selector: 'app-exercise-create',
    templateUrl: './exercise-create.component.html',
    styleUrls: ['./exercise-create.component.scss']
})
export class ExerciseCreateComponent implements OnInit {
    exercise: any = {
        name: '',
        typeId: '',
        description: ''
    };
    exTypes: [any];

    constructor(
        public router: ActivatedRoute,
        private httpService: HttpService,
        private exerciseCreateService: ExerciseCreateService,
    ) { }

    ngOnInit() {
        if (this.router.snapshot.params.id) {
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
