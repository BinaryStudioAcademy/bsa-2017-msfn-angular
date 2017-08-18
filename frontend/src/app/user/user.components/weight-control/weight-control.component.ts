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
    weeklyItems = [];

    newWeight = {
        weight: null,
        waterPct: null,
        boneWeight: null,
        fatPct: null,
        date: ''
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

    settings = {
        recent: {
            symbol: '',
            betterResult: false,
            worseResult: false,
            selection: 'we',
            measurement: 'kg'
        },
        weekly: {
            symbol: '',
            betterResult: false,
            worseResult: false,
            selection: 'we',
            measurement: 'kg'
        }
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

            setTimeout(() => this.updateData(), 500);

            // this.newWeight = {
            //     weight: null,
            //     waterPct: null,
            //     boneWeight: null,
            //     fatPct: null,
            //     date: ''
            // };
        }
    }

    updateData(): void {
        this.weightControlService.getWeightItems(res => {
            if (res[0].hasOwnProperty('weight')) {
                this.weeklyItems = this.weightControlService.getWeeklyWeightItems(res);
                const recentItem = this.weeklyItems[this.weeklyItems.length - 1];
                this.recentDay = this.weightControlService.getRecentDay(recentItem);
                this.currentWeight = recentItem.weight;

                if (this.weeklyItems.length > 1) {
                    this.recentDiff = this.weightControlService.getRecentDiff(this.weeklyItems);
                    this.weeklyDiff = this.weightControlService.getWeeklyDiff(this.weeklyItems);

                    this.changeRecentOption('we');
                    this.changeWeeklyOption('we');
                }
            }
        });
    }

    changeRecentOption(option): void {
        const settings = this.weightControlService.changeOption(option, this.recentDiff);

        this.settings.recent.betterResult = settings.betterResult;
        this.settings.recent.worseResult = settings.worseResult;
        this.settings.recent.selection = settings.selection;
        this.settings.recent.symbol = settings.symbol;
        this.settings.recent.measurement = settings.measurement;
    }

    changeWeeklyOption(option): void {
        const settings = this.weightControlService.changeOption(option, this.weeklyDiff);

        this.settings.weekly.betterResult = settings.betterResult;
        this.settings.weekly.worseResult = settings.worseResult;
        this.settings.weekly.selection = settings.selection;
        this.settings.weekly.symbol = settings.symbol;
        this.settings.weekly.measurement = settings.measurement;
    }

    ngOnInit() {
        this.updateData();
    }
}
