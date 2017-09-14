import { Router } from '@angular/router';
import { FoodPlanListService } from './food-plan-list.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-food-plan-list',
    templateUrl: './food-plan-list.component.html',
    styleUrls: ['./food-plan-list.component.scss'],
    providers: [FoodPlanListService]
})
export class FoodPlanListComponent implements OnInit {

    data = [];

    constructor(private foodPlanListService: FoodPlanListService, private _router: Router) { }

    ngOnInit() {
        this.foodPlanListService.getPlans((response) => {
            console.log(response);
            this.data = response;
        });
    }

    createPlan() {
        this._router.navigate(['/user/food-list/add']);
    }

    openPlan(id) {
        this._router.navigate(['/user/food-list/' + id]);
    }

}
