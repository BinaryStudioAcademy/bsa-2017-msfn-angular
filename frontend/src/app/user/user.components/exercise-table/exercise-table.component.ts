import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk';
import { HttpService } from '../../../services/http.service';
import { IHttpReq } from '../../../models/http-req';
import { MdDialog } from '@angular/material';
import IExercise = ExerciseApi.IExercise;
import { ExerciseDescriptionComponent } from '../exercise-description/exercise-description.component';

@Component({
    selector: 'app-exercise-table',
    templateUrl: './exercise-table.component.html',
    styleUrls: ['./exercise-table.component.scss']
})
export class ExerciseTableComponent implements OnInit {
    displayedColumns = ['name'];
    dataSource: ExerciseDataSource;

    constructor(private httpService: HttpService,
                private dialog: MdDialog) {
    }

    ngOnInit() {
        const request: IHttpReq = {
            url: '/api/exercise',
            method: 'GET',
            body: {}
        };
        this.httpService.sendRequest(request)
            .then(data => {
                this.dataSource = new ExerciseDataSource(data);
            });
    }

    openDescription(exercise: IExercise) {
        this.dialog.open(ExerciseDescriptionComponent, {
            data: exercise
            //, position: {top: '160px'}
        });
    }
}

class ExerciseDataSource extends DataSource<IExercise> {
    constructor(private exercises: IExercise[]) {
        super();
    }

    connect(): Observable<IExercise[]> {
        return Observable.of(this.exercises);
    }

    disconnect() {
    }
}

