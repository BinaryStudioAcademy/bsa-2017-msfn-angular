import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FoodService } from '../../services/food.service';
import { MdDialog, MdSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IFood } from '../../../models/food';
import { IFoodType } from '../../../models/food-type';
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
    types: IFoodType[];
    itemsPerPage = 10000; // TODO: change to smaller and implement
    filter = '';
    page = 1;
    upd: String;
    getOnlyPublished = true;

    constructor(private foodService: FoodService,
        private mdDialog: MdDialog) { }

    ngOnInit() {
        this.foodService.getAllFoodTypes((result) => {
            this.types = result;
            for (const item of result) {
                if (!this.options.includes(item.name)) {
                    this.options.push(item.name);
                }
            }
        });
        this.upd = (+new Date).toString(36);
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
        const food = newItem ? { name: '', description: '', foodType: { _id: false } } : foodData;
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
            const selectedTypes = this.getArrOfTypes(this.items);
            console.log(selectedTypes);
            this.foods = [];
            for (let i = 0; i < this.allFood.length; i++) {
                if (selectedTypes.indexOf(this.allFood[i].foodType._id) >= 0) {
                    this.foods.push(this.allFood[i]);
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
    getArrOfTypes(selectedTypes) {
        const arrOfTypes = [];
        const selectedTypesIds = [];
        this.types.sort(function (a, b) {
            return a.depthLvl - b.depthLvl;
        });
        this.types.forEach(type => {
            if (
                (selectedTypes.indexOf(type.name) >= 0)
                    ||
                (
                    (type.parentType)
                    &&
                    (selectedTypesIds.indexOf(type.parentType._id) >= 0)
                )
                ) {                                     // search selected types & their childs
                selectedTypesIds.push(type._id);
            }
        });
        return selectedTypesIds;
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
        this.upd = (+new Date).toString(36);
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
