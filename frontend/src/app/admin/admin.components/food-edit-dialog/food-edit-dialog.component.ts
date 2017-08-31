import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {FoodService} from '../../services/food.service';
import {IFood} from '../../../models/food';
import {FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'app-food-edit-dialog',
    templateUrl: './food-edit-dialog.component.html',
    styleUrls: ['./food-edit-dialog.component.scss'],
    providers: [FoodService]
})
export class FoodEditDialogComponent implements OnInit {
    public food: IFood;
    public newItem: boolean;
    foodTypes;

    constructor(
        @Inject(MD_DIALOG_DATA) public data: { food: IFood, newItem: boolean},
        private mdDialogRef: MdDialogRef<FoodEditDialogComponent>,
        private foodService: FoodService,
        private router: Router
    ) { }

    nameFormControl = new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
    ]);

    descriptionFormControl = new FormControl('', [
        Validators.minLength(5),
        Validators.maxLength(300)
    ]);

    numberFormControl = new FormControl('', [
        Validators.pattern('^(\d+\.?\d+|\d+)$')
    ]);

    ngOnInit() {
        this.food = this.data.food;
        this.newItem = this.data.newItem;
        this.foodService.getAllFoodTypes( (data) => {
            this.foodTypes = data.map( (item) => item.name );
        });
    }

    save(food) {
        this.foodService[this.newItem ? 'addFood' : 'updateFood'](food, (data) => {});
    }
}
