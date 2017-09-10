import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { FoodService } from '../../services/food.service';
import { IFoodType } from '../../../models/food-type';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-food-type-edit-dialog',
    templateUrl: './food-type-edit-dialog.component.html',
    styleUrls: ['./food-type-edit-dialog.component.scss'],
    providers: [FoodService]
})
export class FoodTypeEditDialogComponent implements OnInit {
    public foodType: IFoodType;
    public newItem: boolean;
    types = [];
    constructor( @Inject(MD_DIALOG_DATA) public data: { foodType: IFoodType, newItem: boolean },
        private foodService: FoodService
    ) { }

    nameFormControl = new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
    ]);

    descriptionFormControl = new FormControl('', [
        Validators.maxLength(300)
    ]);

    ngOnInit() {
        this.foodType = this.data.foodType;
        this.newItem = this.data.newItem;
        this.foodService.getAllFoodTypes((data) => {
            console.log(data);
            this.types = data;
        });
    }

    save() {
        if (!this.foodType.parentType) {
            this.foodType.depthLvl = 1;
        } else {
            const parent = this.types.find((el, ind) => {
                if (el._id === this.foodType.parentType) {
                    console.log(el);
                    return true;
                }
                return false;
            });
            console.log(parent);
            this.foodType.depthLvl = parent.depthLvl + 1;
        }
        console.log(this.foodType);
        this.foodService[this.newItem ? 'addFoodType' : 'updateFoodType'](this.foodType, () => { });
    }

}
