import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FoodService} from '../../services/food.service';
import {MdDialog, MdSort} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {IFood} from '../../../models/food';
import {FoodEditDialogComponent} from '../food-edit-dialog/food-edit-dialog.component';
@Component({
    selector: 'app-food-list',
    templateUrl: './food-list.component.html',
    styleUrls: ['./food-list.component.scss'],
    providers: [FoodService]
})
export class FoodListComponent implements OnInit {
    options = [];
    items = [];
    foods: IFood[] = [];
    foodsShown: IFood[];
    itemsPerPage = 20;
    filter = '';

    constructor(private foodService: FoodService,
                private mdDialog: MdDialog) { }

    ngOnInit() {
        this.foodService.getAllFood( (data) => {
            this.foods = data;
            this.foodsShown = data.slice(0, this.itemsPerPage);
        });
        this.foodService.getAllFoodTypes((result) => {
           for (const item of result) {
               if (!this.options.includes(item.name)) {
                   this.options.push(item.name);
               }
           }
        });
    }

    openEditFoodDialog(newItem: boolean, foodData?: IFood) {
        const food = newItem ? { name: '', foodType: '', description: ''} : foodData;
        this.mdDialog.open(FoodEditDialogComponent, {
            data: {
                newItem,
                food
            }
        });
    }

    updateFoods() {
        debugger;
        let copiedFoods = [...this.foods];
        let filtered = [];
        if (this.items.length > 0) {
            for (const item of this.items) {
                for (const food of copiedFoods) {
                    if (food.foodType.toLowerCase().includes(item.toLowerCase())) {
                        filtered.push(food);
                    }
                }
             }
            copiedFoods = filtered;
        }
        if (this.filter.length > 0) {
            if (filtered.length > 0) {
                copiedFoods = filtered;
                filtered = [];
            }
            for (const food of copiedFoods) {
                if (food.name.toLowerCase().includes(this.filter.toLowerCase())) {
                    filtered.push(food);
                }
            }
        }
        if (filtered.length === 0) {
            return;
        }
        this.foodsShown = filtered.slice(0, this.itemsPerPage);
    }


    onScroll() {
        const filtered: IFood[] = this.foods.filter(food =>
            food.name.toLowerCase().includes(this.filter.toLowerCase()));
        if (this.foodsShown.length < filtered.length) {
            this.foodsShown.push(...filtered.slice(
                this.foodsShown.length,
                this.foodsShown.length + this.itemsPerPage));
        }
    }

    updateFoodList() {

    }

}
