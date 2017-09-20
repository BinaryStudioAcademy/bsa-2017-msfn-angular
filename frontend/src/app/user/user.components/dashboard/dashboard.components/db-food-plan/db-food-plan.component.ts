import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';

@Component({
    selector: 'app-db-food-plan',
    templateUrl: './db-food-plan.component.html',
    styleUrls: [
        './db-food-plan.component.scss',
        '../../dashboard.component.scss'
    ]
})
export class DbFoodPlanComponent implements OnInit {

    constructor(
        private dashboardService: DashboardService,
    ) { }

    title = 'Food Plan';

    foodPlan;

    ngOnInit() {
        this.getFoodPlanData();
    }

    getFoodPlanData(): void {
        this.dashboardService.getFoodPlanData(res => {
            if (res._id) {
                this.foodPlan = res;
            }
        });
    }
}
