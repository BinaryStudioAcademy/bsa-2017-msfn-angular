import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-db-weight-control',
    templateUrl: './db-weight-control.component.html',
    styleUrls: [
        './db-weight-control.component.scss',
        '../../dashboard.component.scss'
    ]
})
export class DbWeightControlComponent implements OnInit {

    constructor() { }

    dataToDisplay = {
        title: 'Weight Control'
    };

    ngOnInit() {
    }
}
