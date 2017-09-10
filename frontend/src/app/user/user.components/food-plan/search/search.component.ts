import { Component, OnInit } from '@angular/core';
import { IFood } from '../../../../models/food';
import { IFoodType } from '../../../../models/food-type';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
    foods: IFood[];
    types: IFoodType[];

  constructor() {
      this.foods = [
          {
              name: 'Banana',
            foodType: 'Fruit',
            kcal: 132,
            protein: 34,
            fat: 12,
            carbons: 56,
            vendor: 'FFF',
          }, {
            name: 'Appleapple',
            foodType: 'Fruit',
            kcal: 54,
            protein: 12,
            fat: 9,
            carbons: 56,
            vendor: 'Простоквашино',
          } , {
          name: 'Peach',
          foodType: 'Fruit',
          kcal: 124,
          protein: 10,
          fat: 0,
          carbons: 87,
          vendor: 'Basfffld',
          }
      ];
      this.types = [ {name: 'Dairy products', isRemoved: false}, { name: 'Fruit', isRemoved: false}];
  }

  ngOnInit() {
  }

}
