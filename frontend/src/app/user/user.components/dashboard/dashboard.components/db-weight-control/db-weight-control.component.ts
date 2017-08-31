import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { WeightControlService } from '../../../weight-control/weight-control.service';
import { DateService } from '../../../../../services/date.service';

@Component({
    selector: 'app-db-weight-control',
    templateUrl: './db-weight-control.component.html',
    styleUrls: [
        './db-weight-control.component.scss',
        '../../dashboard.component.scss'
    ],
    providers: [
        WeightControlService,
        DateService
    ]
})
export class DbWeightControlComponent implements OnInit, OnChanges {

    constructor(private weightControlService: WeightControlService) { }

    @Input() weightItems: any[];
    gotData = false;
    weeklyItems = [];

    diff = {
        recent: {
            weight: 0,
            boneWeight: 0,
            waterPct: 0,
            fatPct: 0
        },
        weekly: {
            weight: 0,
            boneWeight: 0,
            waterPct: 0,
            fatPct: 0
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
            value: 'waterPct',
            recentChecked: false,
            weeklyChecked: false
        },
        {
            value: 'boneWeight',
            recentChecked: false,
            weeklyChecked: false
        },
        {
            value: 'fatPct',
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

    title = 'Weight Control';

    ngOnInit() {
  //      this.getItems();
    }

    ngOnChanges() {
        if (this.weightItems.length > 0 && !this.gotData) {
            this.gotData = true;

            this.weeklyItems = this.weightControlService.getWeeklyWeightItems(this.weightItems);
            this.updateData();
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
            this.diff.weekly = this.weightControlService.getPeriodDiff(this.weeklyItems);

            this.changeOption('weight', 'recent');
            this.changeOption('weight', 'weekly');
        }
    }

    changeOption(option, type): void {
        const settings = this.weightControlService.changeOption(option, this.diff[type]);

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
}
