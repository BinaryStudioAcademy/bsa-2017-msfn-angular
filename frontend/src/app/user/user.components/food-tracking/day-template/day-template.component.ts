import { Component, OnInit, AfterViewInit, Input, Output, Inject, ElementRef, EventEmitter } from '@angular/core';
import { FoodTrackingService } from '../food-tracking.service';
import { SearchComponent } from '../../food-plan/search/search.component';
import { MdDialog, MdDialogRef } from '@angular/material';
import { ToasterService } from '../../../../services/toastr.service';
import { DateService } from '../../../../services/date.service';

@Component({
    selector: 'app-day-template',
    templateUrl: './day-template.component.html',
    styleUrls: ['./day-template.component.scss'],
    providers: [FoodTrackingService, DateService]
})

export class DayTemplateComponent implements OnInit, AfterViewInit {

    @Input() launchedFoodPlan;
    @Input() history;
    @Output() onFinish = new EventEmitter();
    isModal;
    private searchDialog: MdDialogRef<any> | null;

    constructor(
        public foodTrackingService: FoodTrackingService,
        private dialog: MdDialog,
        private toasterService: ToasterService,
        private dateService: DateService,
        public el: ElementRef,
    ) { }

    ngOnInit() {
        console.log(this.launchedFoodPlan);
    }

    ngAfterViewInit() {
        const hostElem = this.el.nativeElement;
        if (hostElem.parentNode.localName === 'md-dialog-container') {
            this.foodTrackingService.getCurentLaunchedFoodPlan(res => {
                this.createLaunchedFoodPlan(res);
                this.isModal = true;
            });
        }
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

        meal.done = meal.products.every(el => {
            return el.done === true || el.done === null;
        });

    }

    addProduct(meal) {
        this.searchDialog = this.dialog.open(SearchComponent);
        this.searchDialog.afterClosed().subscribe(() => {
            this.searchDialog.componentInstance.selectedFood.forEach(el => {
                el.noPlan = true;
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

    createLaunchedFoodPlan(foodPlan) {
        this.launchedFoodPlan = null;
        this.launchedFoodPlan = { };
        for (const key in foodPlan) {
            if (foodPlan.hasOwnProperty(key)) {
                this.launchedFoodPlan[key] = foodPlan[key];
            }
        }
        if (!this.launchedFoodPlan.todayMeals.meals || this.launchedFoodPlan.todayMeals.meals.length === 0) {
            if (foodPlan.kind === 'weekly') {
                foodPlan.days[new Date().getDay() - 1].meals.forEach(el => {
                    this.launchedFoodPlan.todayMeals.meals.push(el);
                });
            } else {
                this.launchedFoodPlan.meals.forEach(el => {
                    this.launchedFoodPlan.todayMeals.meals.push(el);
                });
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
    }
}
