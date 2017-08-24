import { Component, OnInit } from '@angular/core';
import { ActiveTrainingService } from './active-training.service';

@Component({
    selector: 'app-active-training',
    templateUrl: 'active-training.component.html',
    styleUrls: ['active-training.component.scss'],
    providers: [
        ActiveTrainingService
    ]
})

export class ActiveTrainingComponent implements OnInit {
    loaded: boolean = false;
    typeTrain = 'General';
    secundomerBind = {
        intervalTrain: false,
        finishTrain: false
    };

    burnedCallories = 1445;

    constructor(
        private activeTrainingService: ActiveTrainingService
    ) {}

    ngOnInit() {

        this.activeTrainingService.getPlans((data) => {

        });
    }







    onFinish(timeData) {
        const data = {
            time: timeData,
            calories: this.burnedCallories,
        };
        this.activeTrainingService.showFinishDialog(data, result => {
            if (result) {
                this.secundomerBind.finishTrain = true;
            }
            setTimeout(() => { this.secundomerBind.finishTrain = false; }, 1000);
        });
    }

}
