import { Router } from '@angular/router';
import { TrainingListService } from './training-list.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-training-list',
    templateUrl: './training-list.component.html',
    styleUrls: ['./training-list.component.scss'],
    providers: [TrainingListService]
})
export class TrainingListComponent implements OnInit {

    data = [];

    constructor(private trainingListService: TrainingListService, private _router: Router) { }

    ngOnInit() {
        this.trainingListService.getPlans((response) => {
            // console.log(response);
            this.data = response;
        });
    }

    createPlan() {
        this._router.navigate(['/user/training-plan/add']);
    }

    openPlan(id) {
        this._router.navigate(['/user/training-plan/' + id]);
    }

    deletePlan(id, event) {
        event.preventDefault();
        if (event.ctrlKey) {
            this.trainingListService.removePlan(id);
        }
    }

}
