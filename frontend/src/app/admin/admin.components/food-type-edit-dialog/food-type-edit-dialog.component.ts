import {Component, Inject, OnInit} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';
import {FoodService} from '../../services/food.service';
import {IFoodType} from '../../../models/food-type';
import {FormControl, Validators} from '@angular/forms';
import {ToasterService} from '../../../services/toastr.service';

@Component({
    selector: 'app-food-type-edit-dialog',
    templateUrl: './food-type-edit-dialog.component.html',
    styleUrls: ['./food-type-edit-dialog.component.scss'],
    providers: [FoodService]
})
export class FoodTypeEditDialogComponent implements OnInit {
    public foodType: IFoodType;
    public newItem: boolean;
    constructor(@Inject(MD_DIALOG_DATA) public data: { foodType: IFoodType, newItem: boolean},
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

    ngOnInit() {
        this.foodType = this. data.foodType;
        this.newItem = this.data.newItem;
    }

    save() {
        this.foodService[this.newItem ? 'addFoodType' : 'updateFoodType'](this.foodType, () => {
            this.toasterService.showMessage('success', `${this.newItem ? 'Added' : 'Updated'}`);
        });
    }

}
