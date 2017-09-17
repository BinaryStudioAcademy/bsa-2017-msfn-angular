import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodTrackingService } from './food-tracking.service';

@Component({
    selector: 'app-food-tracking',
    templateUrl: './food-tracking.component.html',
    styleUrls: ['./food-tracking.component.scss'],
    providers: [FoodTrackingService]
})
export class FoodTrackingComponent implements OnInit {
    foodPlans;
    launchedFoodFlan;

    constructor(
        public foodTrackingService: FoodTrackingService,
        public activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.foodTrackingService.getCurentLaunchedFoodPlan(res => {
            if (res._id) {
                this.launchedFoodFlan = res;
            } else {
                this.getAllFoodPlans();
            }
            console.log(this.launchedFoodFlan);
        });
    }

    getAllFoodPlans() {
        this.foodTrackingService.getFoodPlans( foodPlans => {
            this.foodPlans = foodPlans;
            console.log(this.foodPlans);
        });
    }

    startTracking(foodPlan) {
        this.foodTrackingService.createLaunchedFoodPlan( foodPlan, res => {
            this.launchedFoodFlan = res;
            console.log(this.launchedFoodFlan);
        });
    }
}
