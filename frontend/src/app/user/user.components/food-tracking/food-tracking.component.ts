import { Component, OnInit, ViewChild } from '@angular/core';
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
    private searchDialog: MdDialogRef<any> | null;
    period = {
        to: new Date(),
        from: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7)
    };
    minMaxCalendarDate = new Date();

    constructor(
        public foodTrackingService: FoodTrackingService,
        public activatedRoute: ActivatedRoute,
        private dialog: MdDialog,
        private toasterService: ToasterService,
        private dateService: DateService,
    ) { }

    ngOnInit() {
        this.foodTrackingService.getCurentLaunchedFoodPlan(res => {
            if (res._id) {
                this.createLaunchedFoodPlan(res);
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

        this.historyMealsStatic = this.launchedFoodPlan.historyMeals;
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

    checkProduct(meal, product) {
        if (product.done === undefined || product.done === false) {
            meal.eaten = meal.eaten ? meal.eaten + product.kcal : product.kcal;
            this.launchedFoodPlan.todayMeals.eaten =
                this.launchedFoodPlan.todayMeals.eaten ? this.launchedFoodPlan.todayMeals.eaten + product.kcal : product.kcal;
            product.done = true;
        } else if (product.done === true) {
            meal.eaten = meal.eaten - product.kcal;
            this.launchedFoodPlan.todayMeals.eaten = this.launchedFoodPlan.todayMeals.eaten - product.kcal;
            product.done = null;
        } else if (product.done === null) {
            product.done = false;
        }
    }

    addProduct(meal) {
        this.searchDialog = this.dialog.open(SearchComponent);
        this.searchDialog.afterClosed().subscribe(() => {
            this.searchDialog.componentInstance.selectedFood.forEach(el => {
                meal.products.push(el);
            });
            this.searchDialog = null;
        });
    }

    save() {
        this.foodTrackingService.updateLaunchedFoodPlan(this.launchedFoodPlan, res => {
            this.toasterService.showMessage('success', null, 'Saved');
        });
    }

    finish() {
        if (this.checkCheckedProduct(this.launchedFoodPlan.todayMeals.meals)) {
            this.launchedFoodPlan.historyMeals.push(this.launchedFoodPlan.todayMeals);
            this.launchedFoodPlan.todayMeals.finished = true;
            this.foodTrackingService.updateLaunchedFoodPlan(this.launchedFoodPlan, res => {
                this.toasterService.showMessage('success', null, 'Saved');
                this.launchedFoodPlan.todayMeals.meals = [];
                this.createLaunchedFoodPlan(this.launchedFoodPlan);
            });
        } else {
            this.toasterService.showMessage('error', null, 'select all products');
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
}
