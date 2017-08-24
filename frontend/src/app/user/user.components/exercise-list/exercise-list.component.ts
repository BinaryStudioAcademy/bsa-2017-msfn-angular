import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-exercise-list',
    templateUrl: './exercise-list.component.html',
    styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit {
    @Input() addExercise;
    @Input() exercisesList;
    @Input() displayExercises;
    @Input() deleteExercise;
    @Input() pageIndex;
    @Input() pageSize;
    @Input() showPage;
    @Input() exercise;
    @Input() editExercise;
    @Input() setEdit;
    @Input() setAdd;
    @Input() setSaveInfo;
    constructor() { }

    ngOnInit() {
        console.log(this.displayExercises);
    }

}
