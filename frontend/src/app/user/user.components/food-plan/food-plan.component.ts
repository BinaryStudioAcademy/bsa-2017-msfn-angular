import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodPlanService } from './food-plan.service';
import { WeeklyComponent } from './weekly/weekly.component';
import { DailyComponent } from './daily/daily.component';
import { IFoodPlan } from './../../../models/foodPlan';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-food-plan',
    templateUrl: './food-plan.component.html',
    styleUrls: ['./food-plan.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FoodPlanComponent implements OnInit {

    foodplan = {
        title: '',
        kind: 'weekly',
        days: [],
        meals: [],
        _id: '',
        errorName: false
    };

    @ViewChild(WeeklyComponent)
    private weeklyData: WeeklyComponent;

    @ViewChild(DailyComponent)
    private dailyData: DailyComponent;

    constructor(
        public foodPlanService: FoodPlanService,
        public activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit() {
        if (this.activatedRoute.snapshot.params.id) {
            const planID = this.activatedRoute.snapshot.params.id;
            this.foodPlanService.getFoodPlanByID(planID, (res) => {
                this.foodplan = res[0];
            });
        }
    }
    currentKind(currentKind) {
        this.foodplan.kind = currentKind;
        if (this.dailyData) {
            this.foodplan.meals = this.dailyData.meals;
            this.foodplan.days.forEach((day, ind) => {
                if (day.editMeal) {
                    day.editMeal = false;
                    day.editMealObj = undefined;
                    day.selected = false;
                }
                if (day.selected) {
                    day.selected = false;
                }
            });
        }
        if (this.weeklyData) {
            const daysPlan = this.weeklyData.days;
            this.foodplan.days = daysPlan;
        }
        console.log(this.foodplan);
        return true;
    }
    savePlan() {
        if (this.foodplan.title.length === 0) {
            this.foodplan.errorName = true;
            return false;
        }
        if (this.weeklyData) {
            const daysPlan = this.weeklyData.days;
            daysPlan.forEach(day => {
                delete day.editMeal;
                delete day.editMealObj;
                delete day.selected;
            });
            this.foodplan.days = daysPlan;
        } else if (this.dailyData) {
            this.foodplan.meals = this.dailyData.meals;
        }
        if (!this.foodplan._id.length) {
            this.foodPlanService.save(this.foodplan, (err, data) => {
                this.foodplan._id = data._id;
            });
        } else {
            this.foodPlanService.update(this.foodplan);
        }

    }
}
