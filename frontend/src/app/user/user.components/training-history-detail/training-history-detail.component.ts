import { Component, OnInit } from '@angular/core';
import { TrainingHistoryDetailService } from './training-history-detail.service';

@Component({
    selector: 'app-training-history-detail',
    templateUrl: './training-history-detail.component.html',
    styleUrls: ['./training-history-detail.component.scss'],
    providers: [TrainingHistoryDetailService]
})
export class TrainingHistoryDetailComponent implements OnInit {

    training;
    date;

    constructor(
        public detailService: TrainingHistoryDetailService,
    ) { }

    ngOnInit() {
        this.detailService.getLaunchedTraining(res => {
            this.training = res[0];
            this.date = this.detailService.beautifyDate(this.training.startDate);
            if (this.training.trainingType === 'interval') {
                this.getIntevalInfo();
            }
        });
    }

    getIntevalInfo() {
        let exercises = 0;
        this.training.intervals.forEach(el => {
            exercises = exercises + el.exList.length;
        });
        this.training.exercisesList.length = exercises;
    }
}
