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

    @Input() historyFoodPlan;
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
        console.log(this.historyFoodPlan);
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
            this.historyFoodPlan.todayMeals.eaten =
                this.historyFoodPlan.todayMeals.eaten ? this.historyFoodPlan.todayMeals.eaten + product.kcal : product.kcal;
            product.done = true;
        } else if (product.done === true) {
            meal.eaten = meal.eaten - product.kcal;
            this.historyFoodPlan.todayMeals.eaten = this.historyFoodPlan.todayMeals.eaten - product.kcal;
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
        this.foodTrackingService.updateLaunchedFoodPlan(this.historyFoodPlan, res => {
            this.toasterService.showMessage('success', null, 'Saved');
        });
    }

    finish() {
        if (this.checkCheckedProduct(this.historyFoodPlan.todayMeals.meals)) {
            this.historyFoodPlan.historyMeals.push(this.historyFoodPlan.todayMeals);
            this.historyFoodPlan.todayMeals.finished = true;

            this.foodTrackingService.updateLaunchedFoodPlan(this.historyFoodPlan, res => {
                this.toasterService.showMessage('success', null, 'Saved');
                this.historyFoodPlan.todayMeals.meals = [];
                this.createLaunchedFoodPlan(this.historyFoodPlan);
                this.onFinish.emit();
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
        this.historyFoodPlan = JSON.parse(JSON.stringify(foodPlan));
        if (!this.historyFoodPlan.todayMeals.meals || this.historyFoodPlan.todayMeals.meals.length === 0) {
            if (foodPlan.kind === 'weekly') {
                foodPlan.days[new Date().getDay() - 1].meals.forEach(el => {
                    this.historyFoodPlan.todayMeals.meals.push(el);
                });
            } else {
                this.historyFoodPlan.meals.forEach(el => {
                    this.historyFoodPlan.todayMeals.meals.push(el);
                });
            }
        }

        if (!this.historyFoodPlan.todayMeals.date) {
            this.historyFoodPlan.todayMeals.date = new Date();
        }

        if (!this.historyFoodPlan.todayMeals.totalKcal) {
            this.historyFoodPlan.todayMeals.totalKcal = this.historyFoodPlan.todayMeals.meals.reduce((total, el) => {
                return total + el.kcal;
            }, 0);
        }
    }
}
