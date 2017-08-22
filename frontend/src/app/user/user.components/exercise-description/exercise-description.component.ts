import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { MarkdownService } from '../../../services/markdown.service';

@Component({
    selector: 'app-exercise-description',
    templateUrl: './exercise-description.component.html',
    styleUrls: ['./exercise-description.component.scss']
})
export class ExerciseDescriptionComponent implements OnInit {

    convertedDescription: string;

    constructor(@Inject(MD_DIALOG_DATA) public exercise,
                private markdownService: MarkdownService) {
        this.convertedDescription = markdownService.convert(this.exercise.description);
    }

    ngOnInit() {
    }

}
