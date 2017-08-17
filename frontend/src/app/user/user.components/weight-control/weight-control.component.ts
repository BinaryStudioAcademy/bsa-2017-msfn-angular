import { Component, OnInit } from '@angular/core';
import { WeightControlService } from './weight-control.service';
import { DateService } from '../../../services/date.service';
import { FormControl, Validators } from '@angular/forms';
import { IWeightControl } from '../../../models/weight-control';

@Component({
    selector: 'app-weight-control',
    templateUrl: './weight-control.component.html',
    styleUrls: ['./weight-control.component.scss'],
    providers: [
        WeightControlService,
        DateService
    ]
})
export class WeightControlComponent implements OnInit {

    previousDay: string;
    currentWeight: number;
    weightOptions = [
        'we',
        'wa',
        'b',
        'f'
    ];
    previousDiff: string;
    selectionPrev: string;
    perWeekDiff: string;
    selectionPerWeek: string;

    newWeight = {
        weight: null,
        waterPct: null,
        boneWeight: null,
        fatPct: null,
        date: ''
    };
    weightToPass: IWeightControl;

    constructor(private weightControlService: WeightControlService,
                private dateService: DateService) { }

    weightFormControl = new FormControl('', [
        Validators.required,
        Validators.min(30),
        Validators.max(300)
    ]);

    waterFormControl = new FormControl('', [
        Validators.required,
        Validators.min(40),
        Validators.max(80)
    ]);

    boneFormControl = new FormControl('', [
        Validators.required,
        Validators.min(10),
        Validators.max(20)
    ]);

    fatFormControl = new FormControl('', [
        Validators.required,
        Validators.min(5),
        Validators.max(35)
    ]);

    addWeight(): void { }

    ngOnInit() {
        this.previousDay = '2017-08-16';
        this.currentWeight = 60;
        this.previousDiff = '+3';
        this.perWeekDiff = '-3';
    }

}
