import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';
import {FoodService} from '../../services/food.service';
import {IFood} from '../../../models/food';
import {FormControl, Validators} from '@angular/forms';
import {ToasterService} from '../../../services/toastr.service';

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
        private foodService: FoodService,
        private toasterService: ToasterService
    ) { }

    nameFormControl = new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
    ]);

    descriptionFormControl = new FormControl('', [
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

    save() {
        /*if (!(this.nameFormControl.valid
            && this.numberFormControl.valid)) {
            this.toasterService.showMessage('error', 'Data wasn\'t added', 'Invalid data');
            return;
        }*/
        this.foodService[this.newItem ? 'addFood' : 'updateFood'](this.food, (data) => {
            this.updateData(data);
        });
    }

    updateData(data) {}
}
