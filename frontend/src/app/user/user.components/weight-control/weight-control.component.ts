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
    weeklyItems: any[];

    newWeight = {
        weight: 60,
        waterPct: 50,
        boneWeight: 10,
        fatPct: 10,
        date: '2017-08-18'
    };

    recentDiff = {
        we: 0,
        b: 0,
        wa: 0,
        f: 0
    };
    weeklyDiff = {
        we: 0,
        b: 0,
        wa: 0,
        f: 0
    };
    recentSymbol = '';
    weeklySymbol = '';

    recentDay: string;
    currentWeight: number;

    options = [
        {
            value: 'we',
            recentChecked: true,
            weeklyChecked: true
        },
        {
            value: 'wa',
            recentChecked: false,
            weeklyChecked: false
        },
        {
            value: 'b',
            recentChecked: false,
            weeklyChecked: false
        },
        {
            value: 'f',
            recentChecked: false,
            weeklyChecked: false
        }
    ];

    selectionPrev = 'we';
    selectionPerWeek = 'we';

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
        Validators.min(3),
        Validators.max(60)
    ]);

    fatFormControl = new FormControl('', [
        Validators.required,
        Validators.min(5),
        Validators.max(35)
    ]);

    addWeight(): void {
        if (this.weightFormControl.valid &&
            this.waterFormControl.valid &&
            this.boneFormControl.valid &&
            this.fatFormControl.valid) {

            const currentDate = new Date();
            this.newWeight.date = currentDate.toISOString();

            this.weightControlService.addWeight(this.newWeight, res => {
                if (typeof(res) === 'object') {
                    this.toasterService.showMessage('success', null);
                } else {
                    this.toasterService.showMessage('error', null);
                }
            });

            this.updateData();
        }
    }

    updateData(): void {
        this.weightControlService.getWeightItems(res => {
            this.weeklyItems = this.weightControlService.getWeeklyWeightItems(res);
            this.recentDiff = this.weightControlService.getRecentDiff(this.weeklyItems);
            this.weeklyDiff = this.weightControlService.getWeeklyDiff(this.weeklyItems);
            const recentItem = this.weeklyItems[this.weeklyItems.length - 1];
            this.recentDay = this.weightControlService.getRecentDay(recentItem);
            this.currentWeight = this.newWeight.weight;
        });
    }

    changeRecentOption(option): void {
        this.selectionPrev = option.value;

        if (this.recentDiff[option.value] > 0) {
            this.recentSymbol = '+';
        } else if (this.recentDiff[option.value] < 0) {
            this.recentSymbol = '-';
        } else {
            this.recentSymbol = '';
        }
    }

    changeWeeklyOption(option): void {
        this.selectionPerWeek = option.value;

        if (this.weeklyDiff[option.value] > 0) {
            this.weeklySymbol = '+';
        } else if (this.weeklyDiff[option.value] < 0) {
            this.weeklySymbol = '-';
        } else {
            this.weeklySymbol = '';
        }
    }

    ngOnInit() {
        this.updateData();
    }
}
