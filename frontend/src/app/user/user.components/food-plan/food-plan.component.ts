import { Component, OnInit } from '@angular/core';
import { FoodPlanService } from './food-plan.service';

@Component({
    selector: 'app-food-plan',
    templateUrl: './food-plan.component.html',
    styleUrls: ['./food-plan.component.scss'],
    providers: [FoodPlanService]
})
export class FoodPlanComponent implements OnInit {

    foodplan = {
        title: '',
        type: '',
    };

    constructor() { }

    ngOnInit() {
    }
    currentType(currentType) {
        console.log(currentType);
        this.foodplan.type = currentType;
        console.log(this.foodplan);
    }
}
