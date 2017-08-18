import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { SettingsService } from './settings.service';
import { ToasterService } from '../../../services/toastr.service';

@Component({
    selector: 'app-profile',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    providers: [SettingsService]
})
export class SettingsComponent implements OnInit {
    timeZone;

    settings = {
        weight: [],
        distances: [],
        temperature: [],
        timeFormat: [],
        dateFormat: [],
        startWeek: [],
    };
   /*  {
        unitTypes: [{ code: 1, name: 'Metric units' }, { code: 2, name: 'Imperial units' }, { code: 3, name: 'mix units' }],
        weights: [{ code: 1, name: 'Kg' }, { code: 2, name: 'Lbs' }],
        distances: [{ code: 1, name: 'M' }, { code: 2, name: 'Inches' }, { code: 3, name: 'Km' }],
        temperature: [{ code: 1, name: '°C' }, { code: 2, name: '°F' }],
        timeFormat: [{ code: 1, name: '24-hour clock' }, { code: 2, name: '12-hour clock' }],
        dateFormat: [{ code: 1, name: 'European (day.month.year)' }, { code: 2, name: 'American (month/day/year)' }],
        startWeek: [{ code: 1, name: 'Monday' }, { code: 2, name: 'Sunday' }],
        activityLevel: [
            {
                code: 1,
                name: 'Relative inactive'
            },
            {
                code: 2,
                name: 'Occasionally active'
            },
            {
                code: 3,
                name: 'Moderately active'
            },
            {
                code: 4,
                name: 'Active'
            },
            {
                code: 5,
                name: 'Very active'
            },
        ]
    }; */

    userSettings = {
        weight: 'Kg',
        trainingWeight: 'Kg',
        distance: 'M',
        temperature: '°C',
        timeFormat: '24-hour clock',
        dateFormat: 'European (day.month.year)',
        startWeek: 'Monday',
        timeZone: '0'
    };

    constructor(
        private settingsService: SettingsService,
        private toasterService: ToasterService) {
    }

    ngOnInit() {
        this.timeZone = this.settingsService.getTimeZone();
        this.settingsService.getUserSettings((res) => {
            if (res.settings) {
                this.userSettings = res.settings;
            }
        });
        this.settingsService.getMeasurements((res) => {
            res.forEach(el => {
                el.measureUnits.forEach(unit => {
                    this.settings[el.measureName].push(unit.unitName);
                });
            });
        });
    }

    saveSettings() {
        this.settingsService.saveSettings({'settings': this.userSettings}, (res) => {
            this.toasterService.showMessage('success', null);
        });
    }

    setUnitFormat() {
        /* if (this.userSettings.unitType !== 3) {
            for (const key in this.userSettings) {
                if (this.userSettings.hasOwnProperty(key)) {
                    if (key !== 'timeZone' && key !== 'activityLevel') {
                        this.userSettings[key] = this.userSettings.unitType;
                    }
                }
            }
        } */
    }

    checkUnitFormat() {
        /* const userSettingsArray = [];
        for (const key in this.userSettings) {
            if (this.userSettings.hasOwnProperty(key)) {
                if (key !== 'timeZone' && key !== 'activityLevel' && key !== 'unitType') {
                    userSettingsArray.push(this.userSettings[key]);
                }
            }
        }

        if (userSettingsArray.every(el => el === 1)) {
            this.userSettings.unitType = 1;
        } else if (userSettingsArray.every(el => el === 2)) {
            this.userSettings.unitType = 2;
        } else {
            this.userSettings.unitType = 3;
        } */
    }
}
