import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodTrackingService } from './food-tracking.service';
import { MdDialog, MdDialogRef } from '@angular/material';
import { SearchComponent } from '../food-plan/search/search.component';
import { ToasterService } from '../../../services/toastr.service';
import { DateService } from '../../../services/date.service';

@Component({
    selector: 'app-food-tracking',
    templateUrl: './food-tracking.component.html',
    styleUrls: ['./food-tracking.component.scss'],
    providers: [FoodTrackingService, DateService]
})

export class FoodTrackingComponent implements OnInit {
    foodPlans;
    launchedFoodPlan;
    historyMealsStatic;
    tomorrowFoodPlan;
    period = {
        to: new Date(),
        from: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7)
    };
    minMaxCalendarDate = new Date();

    constructor(
        public foodTrackingService: FoodTrackingService,
        public activatedRoute: ActivatedRoute,
        private toasterService: ToasterService,
        private dateService: DateService,
    ) { }

    ngOnInit() {
        this.foodTrackingService.getCurentLaunchedFoodPlan(res => {
            if (res._id) {
                this.createLaunchedFoodPlan(res);
                this.checkTomorowData();
            } else {
                this.getAllFoodPlans();
            }
        });
    }

    createLaunchedFoodPlan(foodPlan) {
        this.launchedFoodPlan = foodPlan;
        if (!this.launchedFoodPlan.todayMeals.meals || this.launchedFoodPlan.todayMeals.meals.length === 0) {
            if (foodPlan.kind === 'weekly') {
                this.launchedFoodPlan.todayMeals.meals = foodPlan.days[new Date().getDay() - 1].meals;
            } else {
                this.launchedFoodPlan.todayMeals.meals = this.launchedFoodPlan.meals;
            }
        }

        if (!this.launchedFoodPlan.todayMeals.date) {
            this.launchedFoodPlan.todayMeals.date = new Date();
        }

        if (!this.launchedFoodPlan.todayMeals.totalKcal) {
            this.launchedFoodPlan.todayMeals.totalKcal = this.launchedFoodPlan.todayMeals.meals.reduce((total, el) => {
                return total + el.kcal;
            }, 0);
        }

        this.historyMealsStatic = JSON.parse(JSON.stringify(this.launchedFoodPlan.historyMeals));
        this.foodTrackingService.updateLaunchedFoodPlan(this.launchedFoodPlan, res => { });
        this.updateDataHistoryView();
    }

    getAllFoodPlans() {
        this.foodTrackingService.getFoodPlans(foodPlans => {
            this.foodPlans = foodPlans;
        });
    }

    startTracking(foodPlan) {
        this.foodTrackingService.createLaunchedFoodPlan(foodPlan, res => {
            this.createLaunchedFoodPlan(res);
        });
    }

    finish(status) {
        if (status === 'plan') {
            this.launchedFoodPlan.status = 'finished';
            this.foodTrackingService.updateLaunchedFoodPlan(this.launchedFoodPlan, res => {
                this.toasterService.showMessage('success', null, 'Saved');
            });
            this.launchedFoodPlan = null;
            this.getAllFoodPlans();
        }
    }

    checkCheckedProduct(meals) {
        return meals.every(el => {
            return el.products.every(product => {
                return product.done === true || product.done === null;
            });
        });
    }

    updateDataHistoryView() {
        this.launchedFoodPlan.historyMeals = this.historyMealsStatic.filter(el => {
            return new Date(el.date) < new Date(this.period.to.getTime() + 1000 * 60 * 60 * 24 - 1000 * 60)
            && new Date(el.date) > this.period.from;
        });
    }

    checkTomorowData() {
        if (this.launchedFoodPlan.kind === 'weekly') {
            this.tomorrowFoodPlan = this.launchedFoodPlan.days[new Date().getDay()].meals;
        } else {
            this.tomorrowFoodPlan = this.launchedFoodPlan.meals;
        }
    }
}
