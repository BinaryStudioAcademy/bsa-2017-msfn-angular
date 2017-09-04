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
    options = [];
    items = [];
    foods: IFood[] = [];
    foodsShown: IFood[];
    itemsPerPage = 10000; // TODO: change to smaller and implement
    filter = '';
    page = 1;
    getOnlyPublished = true;

    constructor(private foodService: FoodService,
        private mdDialog: MdDialog) { }

    ngOnInit() {
        this.updateFoodList();
        this.foodService.getAllFoodTypes((result) => {
            for (const item of result) {
                if (!this.options.includes(item.name)) {
                    this.options.push(item.name);
                }
            }
        });
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
        if (this.filter.length >= 0) {
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
        this.foodsShown = filtered.slice((this.page - 1) * this.itemsPerPage, this.page * this.itemsPerPage);
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

        if (this.getOnlyPublished) {
            this.foodService.getOnlyPublishedFood((data) => {
                data = data.filter((elem) => {
                    return elem.isRemoved === false;
                });
                this.foods = data;
                this.foodsShown = data.slice(0, this.itemsPerPage);
            });
        } else {
            this.foodService.getAllFood((data) => {
                data = data.filter((elem) => {
                    return elem.isRemoved === false;
                });
                this.foods = data;
                this.foodsShown = data.slice(0, this.itemsPerPage);
            });
        }
    }

}
