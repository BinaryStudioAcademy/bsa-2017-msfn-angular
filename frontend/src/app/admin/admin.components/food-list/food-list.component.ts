import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { MdDialog, MdSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IFood } from '../../../models/food';
import { FoodEditDialogComponent } from '../food-edit-dialog/food-edit-dialog.component';
@Component({
    selector: 'app-food-list',
    templateUrl: './food-list.component.html',
    styleUrls: ['./food-list.component.scss'],
    providers: [FoodService]
})
export class FoodListComponent implements OnInit {
    options = []; // TODO: upd
    items = [];
    foods: IFood[] = [];
    allFood: IFood[];
    foodsShown: IFood[];
    itemsPerPage = 10000; // TODO: change to smaller and implement
    filter = '';
    page = 1;
    getOnlyPublished = true;

    constructor(private foodService: FoodService,
        private mdDialog: MdDialog) { }

    ngOnInit() {
            this.foodService.getAllFoodTypes((result) => {
            for (const item of result) {
                if (!this.options.includes(item.name)) {
                    this.options.push(item.name);
                }
            }
        });
        this.updateFoodList();
    }

    toggleOnlyPublished(value) {
        this.getOnlyPublished = value;
        this.updateFoodList();
    }

    changeFoodPrivacy(id, value) {
        this.foodService.changeFoodPrivacy(id, value, () => { });
    }

    removeFood(id, event) {
        event.stopPropagation();
        this.foodService.deleteFood(id, () => { });
        this.updateFoodList();
    }

    openEditFoodDialog(newItem: boolean, foodData?: IFood) {
        const food = newItem ? { name: '', foodType: '', description: '' } : foodData;
        const dialogRef = this.mdDialog.open(FoodEditDialogComponent, {
            data: {
                newItem,
                food
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            this.updateFoodList();
        });
    }

    updateFoods() {
        if (this.items.length > 0) {
            this.foods = [];
            for (let i = 0; i < this.allFood.length; i++) {
                for (let j = 0; j < this.items.length; j++) {
                    if (this.allFood[i].foodType === this.items[j]) {
                        this.foods.push(this.allFood[i]);
                        break;
                    }
                }
            }
        } else {
            this.foods = this.allFood;
        }
        this.foods = this.foods.filter((elem) => {
            return elem.name.toLowerCase().includes(this.filter.toLowerCase())
            || elem.vendor.toLowerCase().includes(this.filter.toLowerCase());
        });
        this.foodsShown = this.foods;
    }


    onScroll() {
        const filtered: IFood[] = this.foods.filter(food =>
            food.name.toLowerCase().includes(this.filter.toLowerCase()));
        if (this.foodsShown.length < filtered.length) {
            this.foodsShown.push(...this.foods.slice(
                this.foodsShown.length,
                this.foodsShown.length + this.itemsPerPage));
        }
    }

    updateFoodList() {

        if (this.getOnlyPublished) {
            this.foodService.getOnlyPublishedFood((data) => {
                data = this.updateData(data);
                this.allFood = data;
                this.foods = data;
                this.foodsShown = data.slice(0, this.itemsPerPage);
            });
        } else {
            this.foodService.getAllFood((data) => {
                data = this.updateData(data);
                this.allFood = data;
                this.updateFoods();
            });
        }
    }

    updateData(data) {
        data = data.filter((elem) => {
            return elem.isRemoved === false;
        });
        data = data.sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
        return data;
    }

}
