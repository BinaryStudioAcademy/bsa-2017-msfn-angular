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

    diff = {
        recent: {
            weight: 0,
            bones: 0,
            water: 0,
            fat: 0
        },
        weekly: {
            weight: 0,
            bones: 0,
            water: 0,
            fat: 0
        }
    };

    recentDay: string;
    currentWeight: number;

    options = [
        {
            value: 'weight',
            recentChecked: true,
            weeklyChecked: true
        },
        {
            value: 'water',
            recentChecked: false,
            weeklyChecked: false
        },
        {
            value: 'bones',
            recentChecked: false,
            weeklyChecked: false
        },
        {
            value: 'fat',
            recentChecked: false,
            weeklyChecked: false
        }
    ];

    settings = {
        recent: {
            symbol: '',
            betterResult: false,
            worseResult: false,
            selection: 'weight',
            measurement: 'kg'
        },
        weekly: {
            symbol: '',
            betterResult: false,
            worseResult: false,
            selection: 'weight',
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

            this.weeklyItems.push(this.newWeight);
            this.updateData();

            this.weightFormControl.reset();
            this.waterFormControl.reset();
            this.boneFormControl.reset();
            this.fatFormControl.reset();
        }
    }

    getItems(): void {
        this.weightControlService.getWeightItems(res => {
            if (res[0].hasOwnProperty('weight')) {
                this.weeklyItems = this.weightControlService.getWeeklyWeightItems(res);
                this.updateData();
            }
        });
    }

    updateData(): void {
        const recentItem = this.weeklyItems[this.weeklyItems.length - 1];
        this.recentDay = this.weightControlService.getRecentDay(recentItem);
        this.currentWeight = recentItem.weight;

        if (this.weeklyItems.length > 1) {
            this.diff.recent = this.weightControlService.getRecentDiff(this.weeklyItems);
            this.diff.weekly = this.weightControlService.getWeeklyDiff(this.weeklyItems);

            this.changeOption('weight', 'recent');
            this.changeOption('weight', 'weekly');
        }
    }

    changeOption(option, type): void {
        const settings = this.weightControlService.getSettings(option, this.diff[type]);

        this.settings[type].betterResult = settings.betterResult;
        this.settings[type].worseResult = settings.worseResult;
        this.settings[type].selection = settings.selection;
        this.settings[type].symbol = settings.symbol;
        this.settings[type].measurement = settings.measurement;

        if (type === 'recent') {
            for (const item of this.options) {
                item.recentChecked = item.value === option;
            }
        } else {
            for (const item of this.options) {
                item.weeklyChecked = item.value === option;
            }
        }
    }

    ngOnInit() {
        this.getItems();
    }
}
