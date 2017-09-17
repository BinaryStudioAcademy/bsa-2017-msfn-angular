import { Component, OnInit, Output, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { FoodPlanService } from './../food-plan.service';

@Component({
    selector: 'app-weekly',
    templateUrl: './weekly.component.html',
    styleUrls: ['./weekly.component.scss'],
    providers: [FoodPlanService]
})
export class WeeklyComponent implements OnInit, OnDestroy {

    @Input() days;

    activeDay: number;
    products: any;
    subscription: Subscription;
    constructor(public foodPlanService: FoodPlanService, ) {
        this.subscription = this.foodPlanService.getProductList().subscribe(products => { this.products = products; });
    }

    ngOnInit() {
        if (!this.days.length) {
            this.days = [
                {
                    name: 'Monday',
                    selected: false,
                    kcal: 0,
                    meals: [],
                },
                {
                    name: 'Tuesday',
                    selected: false,
                    meals: [],
                    kcal: 0,
                },
                {
                    name: 'Wednesday',
                    selected: false,
                    kcal: 0,
                    meals: [],
                },
                {
                    name: 'Thursday',
                    selected: false,
                    kcal: 0,
                    meals: [],
                },
                {
                    name: 'Friday',
                    selected: false,
                    kcal: 0,
                    meals: [],
                },
                {
                    name: 'Saturday',
                    selected: false,
                    kcal: 0,
                    meals: [],
                },
                {
                    name: 'Sunday',
                    selected: false,
                    kcal: 0,
                    meals: [],
                }
            ];
        }

        this.days.forEach(day => {
            let dayKcal = 0;
            day.meals.forEach(meal => {
                let mealKcal = 0;
                meal.products.forEach(product => {
                    mealKcal += parseFloat(product.kcal);
                });
                dayKcal += mealKcal;
                meal.kcal = Math.round(mealKcal);
            });
            day.kcal = Math.round(dayKcal);
        });
    }

    selectDay(dayName) {
        this.days.forEach((day: any, index: number) => {
            if (day.name === dayName) {
                day.selected = true;
                this.activeDay = index;
            } else {
                day.selected = false;
            }
        });
    }
    showForm(currentDay, mealId?: number) {
        this.days.forEach((day: any) => {
            if (day.name === currentDay.name) {
                day.editMeal = true;
                if (mealId >= 0) {
                    day.editMealObj = Object.assign({}, day.meals[mealId]);
                    day.editMealId = mealId;
                } else {
                    day.editMealObj = {
                        name: '',
                        products: []
                    };
                }
            } else {
                day.editMeal = false;
            }
        });
        const sendData = {
            show: true,
            list: []
        };

        this.foodPlanService.sendProductList(sendData);
    }

    closeForm(day) {
        day.editMeal = false;
        const sendData = {
            show: false,
            list: []
        };
        this.foodPlanService.sendProductList(sendData);
    }

    saveMeal(day) {
        const meal2Save = day.editMealObj;
        if (meal2Save.name.length > 0) {

            if (this.products.data.list) {
                meal2Save.products = meal2Save.products.concat(this.products.data.list);
            }
            let mealKcal = 0;
            meal2Save.products.forEach(element => {
                mealKcal += parseFloat(element.kcal);
            });
            meal2Save.kcal = mealKcal;
            const mealId: number = day.editMealId;
            if (mealId >= 0) {
                day.meals[mealId] = meal2Save;
                delete day.editMealId;
            } else {
                day.meals.push(meal2Save);
            }
            day.editMeal = false;
            const sendData = {
                show: false,
                list: []
            };
            this.foodPlanService.sendProductList(sendData);
        }
        return true;
    }

    delItem(source, i) {
        if (source[i]) {
            source.splice(i, 1);
            return true;
        } else {
            return false;
        }
    }
    delNewItem(source, i) {
        if (source[i]) {
            source.splice(i, 1);
            const sendData = this.products.data;
            sendData.list = source;
            this.foodPlanService.sendProductList(sendData);
            return true;
        } else {
            return false;
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
