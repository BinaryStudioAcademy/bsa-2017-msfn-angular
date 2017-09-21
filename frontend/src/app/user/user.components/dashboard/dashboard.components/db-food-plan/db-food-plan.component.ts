import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { MdDialog, MdDialogRef } from '@angular/material';
import { DayTemplateComponent } from '../../../food-tracking/day-template/day-template.component';

@Component({
    selector: 'app-db-food-plan',
    templateUrl: './db-food-plan.component.html',
    styleUrls: [
        './db-food-plan.component.scss',
        '../../dashboard.component.scss'
    ]
})
export class DbFoodPlanComponent implements OnInit {
    private foodTrackingDialog: MdDialogRef<any> | null;

    constructor(
        private dashboardService: DashboardService,
        private dialog: MdDialog,
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

    openFoodTracking(): void {
        this.foodTrackingDialog = this.dialog.open(DayTemplateComponent, {
            height: '80vh'
        });
        this.foodTrackingDialog.afterClosed().subscribe(() => {
            this.foodPlan = this.foodTrackingDialog.componentInstance.launchedFoodPlan;
            this.foodTrackingDialog = null;
        });
    }
}
