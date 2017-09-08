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
            this.training = res;
            this.date = this.detailService.beautifyDate(this.training.startDate);
            if (res.trainingType === 'interval') {
                this.getIntevalInfo();
            }
        });
    }

    getIntevalInfo() {
        let totalTime = 0,
            warmTime = 0,
            exercises = 0;
        this.training.intervals.forEach(el => {
            totalTime = totalTime + el.lapTime;
            warmTime = warmTime + el.warmTime;
            exercises = exercises + el.exList.length;
        });
        this.training.exercisesList.length = exercises;
        this.training.results.time.total = this.detailService.beautifyTime(totalTime);
        this.training.results.time.warming = this.detailService.beautifyTime(warmTime);
    }
}
