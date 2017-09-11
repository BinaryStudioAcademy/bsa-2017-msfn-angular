import { Component, OnInit } from '@angular/core';
import { IFood } from '../../../../models/food';
import { IFoodType } from '../../../../models/food-type';
import { FoodPlanService } from './../food-plan.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    foods: IFood[];
    types: IFoodType[];
    showItem = {};
    depth1 = [];
    depth2 = [];
    depth3 = [];
    filtered = null;

    constructor(
        public foodPlanService: FoodPlanService,
    ) {
        /*  this.foods = [
             {
               name: 'Banana',
               foodType: 'Fruit',
               kcal: 132,
               protein: 34,
               fat: 12,
               carbons: 56,
               measure: '',
               vendor: 'FFF',
             }, {
               name: 'Appleapple',
               foodType: 'Fruit',
               kcal: 54,
               protein: 12,
               fat: 9,
               carbons: 56,
               measure: '',
               vendor: 'Простоквашино',
             } , {
             name: 'Peach',
             foodType: 'Fruit',
             kcal: 124,
             protein: 10,
             fat: 0,
             carbons: 87,
             measure: '',
             vendor: 'Basfffld',
             }
         ];
         this.types = [ {name: 'Dairy products', parentType: '', depthLvl: 1, isRemoved: false},
         { name: 'Fruit', parentType: '', depthLvl:1, isRemoved: false}]; */
    }

    ngOnInit() {
        this.foodPlanService.getFood(res => {
            this.foods = res;
        });
        
        this.foodPlanService.getFoodTypes(res => {
            console.log(res);
            this.types = res;
            this.createTypesDepth(res);
        });
    }

    createTypesDepth(types) {
        this.depth1 = [];
        this.depth2 = [];
        this.depth3 = [];
        types.forEach(el => {
            if (el.depthLvl === 1) {
                this.depth1.push(el);
            } else if (el.depthLvl === 2) {
                this.depth2.push(el);
            } else if (el.depthLvl === 3) {
                this.depth3.push(el);
            }
        });
    }

    toggleChild(id) {
        if (this.showItem[id] === true) {
            this.showItem[id] = false;
        } else {
            this.showItem[id] = true;
        }
    }

    searchType(string) {
        if (string.length > 0) {
            this.filtered = this.types.filter(el => {
                return el.name.toLowerCase().includes(string.toLowerCase());
            });
        } else {
            this.filtered = null;
        }
    }

}
