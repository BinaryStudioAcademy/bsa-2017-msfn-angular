import { Component, OnInit } from '@angular/core';
import { WeightControlService } from './weight-control.service';
import { DateService } from '../../../services/date.service';
import { FormControl, Validators } from '@angular/forms';
import { ToasterService } from '../../../services/toastr.service';

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

    weightItems = [];

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

    constructor(private weightControlService: WeightControlService,
                private toasterService: ToasterService) { }

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

    addWeight(): void {
        const dataToPass = this.newWeight;
        this.weightControlService.addWeight(dataToPass, res => {
            if (typeof(res) === 'object') {
                this.toasterService.showMessage('success', null);
            } else {
                this.toasterService.showMessage('error', null);
            }
        });
    }

    ngOnInit() {
        this.weightControlService.getWeightItems(res => {
            this.weightItems = res ? res : [];
            console.log(this.weightItems);
        });

        this.newWeight = {
            weight: 60,
            waterPct: 50,
            boneWeight: 10,
            fatPct: 10,
            date: '2017-08-16'
        };
        this.previousDay = '2017-08-16';
        this.currentWeight = 60;
        this.previousDiff = '+3';
        this.perWeekDiff = '-3';
    }
}
