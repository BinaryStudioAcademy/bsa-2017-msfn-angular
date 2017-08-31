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
    foods: IFood[] = [];

    constructor(private cd: ChangeDetectorRef,
                private foodService: FoodService,
                private mdDialog: MdDialog) { }

    ngOnInit() {
        this.foodService.getAllFood( (data) => {
            this.foods = data;
        });
    }

    openEditFoodDialog(newItem: boolean, food?: IFood) {
        this.mdDialog.open(FoodEditDialogComponent, {
            data: {
                newItem,
                food
            }
        });
    }

}
