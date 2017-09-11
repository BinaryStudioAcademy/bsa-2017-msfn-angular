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
    foodsStatic: IFood[];
    types: IFoodType[];
    showItem = {};
    typesDepth = [];
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
            this.foodsStatic = res;
        });
        
        this.foodPlanService.getFoodTypes(res => {
            this.createTypesDepth(res);
        });
    }

    createTypesDepth(types) {
        let parentIndex = 0;
        let parentIndex2 = 0;
        types.forEach((el, i) => {
            if (el.depthLvl === 1) {
                this.typesDepth.push(el);
                parentIndex = this.typesDepth.length - 1;
                types.forEach((child1, i2) => {
                    if (child1.depthLvl === 2 && child1.parentType.name === el.name) {
                        if (!this.typesDepth[parentIndex].hasOwnProperty('children')) {
                            this.typesDepth[parentIndex].children = [];
                        }
                        this.typesDepth[parentIndex].children.push(child1);
                        parentIndex2 = this.typesDepth[parentIndex].children.length - 1;
                        types.forEach(child2 => {
                            if (child2.depthLvl === 3 && child2.parentType.name === child1.name) {
                                if (!this.typesDepth[parentIndex].children[parentIndex2].hasOwnProperty('children')) {
                                    this.typesDepth[parentIndex].children[parentIndex2].children = [];
                                }
                                this.typesDepth[parentIndex].children[parentIndex2].children.push(child1);
                            }
                        });
                    }
                });
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

    chooseType(type) {
   /*      console.log(type);
        this.foods = this.foodsStatic.filter(el => {
            return el.foodType = type;
        }); */
    }

}
