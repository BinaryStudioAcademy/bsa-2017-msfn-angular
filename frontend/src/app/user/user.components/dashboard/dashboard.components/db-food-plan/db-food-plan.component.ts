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

    title = 'Food Plan';

    kcal = {
        eaten: {
            title: 'Already eaten',
            amount: 0
        },
        left: {
            title: 'Left to eat',
            amount: 0
        }
    };

    meal = [
        {
            title: 'breakfast',
            amount: 400,
            eaten: false
        },
        {
            title: 'lunch',
            amount: 500,
            eaten: false
        },
        {
            title: 'dinner',
            amount: 405,
            eaten: false
        }
    ];

    ngOnInit() {
    }
}
