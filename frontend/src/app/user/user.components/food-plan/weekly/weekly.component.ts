import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { FoodPlanService } from './../food-plan.service';

@Component({
    selector: 'app-weekly',
    templateUrl: './weekly.component.html',
    styleUrls: ['./weekly.component.scss']
})
export class WeeklyComponent implements OnInit {

    days = [
        {
            name: 'Monday',
            selected: false,
            meals: [
                {
                    name: 'Breakfast',
                    products: [
                        {
                            name: 'Milk',
                            quantity: '100ml',
                            kcal: '30'
                        },
                        {
                            name: 'Nesquik cereal',
                            quantity: '100g',
                            kcal: '30'
                        },
                        {
                            name: 'Orange',
                            quantity: '1pc',
                            kcal: '30'
                        }
                    ],
                },
                {
                    name: 'Lunch',
                    products: [
                        {
                            name: 'Cheese soup',
                            quantity: '300ml',
                            kcal: '200'
                        },
                        {
                            name: 'toast',
                            quantity: '2 pc',
                            kcal: '80'
                        }
                    ],
                },
                {
                    name: 'Dinner',
                    products: [
                        {
                            name: 'lasagna',
                            quantity: '200g',
                            kcal: '270'
                        },
                        {
                            name: 'salad',
                            quantity: '150g',
                            kcal: '80'
                        }
                    ],
                },

            ],
        },
        {
            name: 'Tuesday',
            selected: false,
            meals: [],
        },
        {
            name: 'Wednesday',
            selected: false,
            meals: [],
        },
        {
            name: 'Thursday',
            selected: false,
            meals: [],
        },
        {
            name: 'Friday',
            selected: false,
            meals: [],
        },
        {
            name: 'Saturday',
            selected: false,
            meals: [],
        },
        {
            name: 'Sunday',
            selected: false,
            meals: [],
        }
    ];
    activeDay: number;
    products: any;
    subscription: Subscription;
    constructor(public foodPlanService: FoodPlanService, ) {
        this.subscription = this.foodPlanService.getProductList().subscribe(products => { this.products = products; });
    }

    ngOnInit() {
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
    }

    saveMeal(day) {
        const meal2Save = day.editMealObj;
        console.log(day.editMealObj);
        const mealId: number = day.editMealId;
        if (mealId >= 0) {
            day.meals[mealId] = meal2Save;
            delete day.editMealId;
        } else {
            console.log(meal2Save);
            day.meals.push(meal2Save);
        }
        day.editMeal = false;
        console.log(this.days);
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

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
