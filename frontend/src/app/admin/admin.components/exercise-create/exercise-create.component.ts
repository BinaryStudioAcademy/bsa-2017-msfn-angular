import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ExerciseCreateService } from './exercise-create.service';
import { MarkdownService } from '../../../services/markdown.service';
import IExercise = ExerciseApi.IExercise;
import IExerciseType = ExerciseApi.IExerciseType;

@Component({
    selector: 'app-exercise-create',
    providers: [MarkdownService],
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
    convertedDescription: string;
    exTypes: [IExerciseType];

    constructor(public router: ActivatedRoute,
                private exerciseCreateService: ExerciseCreateService,
                private markdownService: MarkdownService) {
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

    saveImg() {
    }

    updateOutput(mdText: string) {
        this.convertedDescription = this.markdownService.convert(mdText);
    }

    fileChangeListener($event) {
        let image: any = new Image();
        const file: File = $event.target.files[0];
        const myReader: FileReader = new FileReader();
        myReader.readAsDataURL(file);
        myReader.onloadend = (loadEvent: any) => {
            image = myReader.result;
            console.log(1);
            // this.profileService.saveTest(image, this.userId, 'img', result => {
            //     console.log(result);
            // });

        };

    }
}
