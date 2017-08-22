import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-db-food-plan',
    templateUrl: './db-food-plan.component.html',
    styleUrls: [
        './db-food-plan.component.scss',
        '../../dashboard.component.scss'
    ]
})
export class DbFoodPlanComponent implements OnInit {

    constructor() { }

    dataToDisplay = {
        title: 'Food Plan'
    };

    ngOnInit() {
    }

}
