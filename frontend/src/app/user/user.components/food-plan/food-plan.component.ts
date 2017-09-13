import { Component, OnInit, ViewChild } from '@angular/core';
import { FoodPlanService } from './food-plan.service';
import { WeeklyComponent } from './weekly/weekly.component';
import { DailyComponent } from './daily/daily.component';

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
        days: [],
        meals: [],
    };
    @ViewChild(WeeklyComponent)
    private weeklyData: WeeklyComponent;

    @ViewChild(DailyComponent)
    private dailyData: DailyComponent;

    constructor(public foodPlanService: FoodPlanService) { }

    ngOnInit() {
    }
    currentType(currentType) {
        this.foodplan.type = currentType;
        if (this.dailyData) {
            this.foodplan.meals = this.dailyData.meals;
        }
        if (this.weeklyData) {
            let daysPlan = this.weeklyData.days;
            this.foodplan.days = daysPlan;
        }
        return true;
    }
    savePlan() {
        console.log(this.weeklyData);
        console.log(this.dailyData);
        if (this.weeklyData) {
            let daysPlan = this.weeklyData.days;
            daysPlan.forEach(day => {
                delete day.editMeal;
                delete day.editMealObj;
                delete day.selected;
            });
            this.foodplan.days = daysPlan;
        } else if (this.dailyData) {
            this.foodplan.meals = this.dailyData.meals;
        }
        console.log(this.foodplan);
        this.foodPlanService.save(this.foodplan, 'POST');

    }
}
