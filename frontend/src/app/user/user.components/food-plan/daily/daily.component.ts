import { Component, OnInit, Output, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { FoodPlanService } from './../food-plan.service';

@Component({
    selector: 'app-daily',
    templateUrl: './daily.component.html',
    styleUrls: ['./daily.component.scss']
})
export class DailyComponent implements OnInit, OnDestroy {

    @Input() meals;
    editableMeal: any;
    editableMealId: number;
    activeMeal: number;
    products: any;
    subscription: Subscription;
    constructor(public foodPlanService: FoodPlanService, ) {
        this.subscription = this.foodPlanService.getProductList().subscribe(products => { this.products = products; });
    }

    ngOnInit() {
        if (!this.meals.length) {
            this.meals = [];
        }

        this.meals.forEach(meal => {
            let mealKcal = 0;
            meal.products.forEach(product => {
                mealKcal += parseFloat(product.kcal);
            });
            meal.kcal = Math.round(mealKcal);
        });
    }

    showForm(mealId?: number) {
        if (mealId >= 0) {
            this.editableMeal = Object.assign({}, this.meals[mealId]);
            this.editableMealId = mealId;
        } else {
            this.editableMeal = {
                name: '',
                products: []
            };
            this.editableMealId = NaN;
        }
        const sendData = {
            show: true,
            list: []
        };

        this.foodPlanService.sendProductList(sendData);
    }

    closeForm() {
        this.editableMeal = false;
        const sendData = {
            show: false,
            list: []
        };
        this.foodPlanService.sendProductList(sendData);
    }

    saveMeal() {
        const meal2Save = this.editableMeal;
        if (meal2Save.name.length > 0) {
            if (this.products.data.list) {
                meal2Save.products = meal2Save.products.concat(this.products.data.list);
            }
            let mealKcal = 0;
            meal2Save.products.forEach(element => {
                mealKcal += parseFloat(element.kcal);
            });
            meal2Save.kcal = mealKcal;
            const mealId: number = this.editableMealId;
            if (mealId >= 0) {
                this.meals[mealId] = meal2Save;
                this.editableMealId = NaN;
            } else {
                this.meals.push(meal2Save);
            }
            const sendData = {
                show: false,
                list: []
            };

            this.editableMeal = false;

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
            this.foodPlanService.sendProductList(this.products);
            return true;
        } else {
            return false;
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
