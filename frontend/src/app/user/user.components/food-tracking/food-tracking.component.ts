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
    foodplan;

    constructor(
        public foodTrackingService: FoodTrackingService,
        public activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit() {
        /* this.foodTrackingService.getFoodPlan( foodPlan => {
            console.log(foodPlan);
            this.foodplan = foodPlan[0];
            if (this.foodplan.type === 'weekly') {
                this.foodplan.meals = this.foodplan.days[new Date().getDay() - 1].meals;
            }
        }); */
    }
}
