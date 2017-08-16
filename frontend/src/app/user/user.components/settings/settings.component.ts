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

    settings = {
        unitTypes: [{ code: 1, name: 'Metric units' }, { code: 2, name: 'Imperial units' }, { code: 3, name: 'mix units' }],
        weights: [{ code: 1, name: 'Kg' }, { code: 2, name: 'Lbs' }],
        distances: [{ code: 1, name: 'M' }, { code: 2, name: 'Inches' }, { code: 3, name: 'Km' }],
        temperature: [{ code: 1, name: '°C' }, { code: 2, name: '°F' }],
        timeFormat: [{ code: 1, name: '24-hour clock' }, { code: 2, name: '12-hour clock' }],
        dateFormat: [{ code: 1, name: 'European (day.month.year)' }, { code: 2, name: 'American (month/day/year)' }],
        startWeek: [{ code: 1, name: 'Monday' }, { code: 2, name: 'Sunday' }],
    /*     activityLevel: [
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
        ] */
    };

    userSettings = {
        unitType: 1,
        weight: 1,
        trainingWeight: 1,
        distance: 1,
        temperature: 1,
        timeFormat: 1,
        dateFormat: 1,
        startWeek: 1,
        activityLevel: 5,
        timeZone: '0'
    };

    timeZone;

    constructor(
        private settingsService: SettingsService,
        private toasterService: ToasterService) {
            this.timeZone = settingsService.getTimeZone();
            // this.userSettings = this.settingsService.getUserSettings();
            // this.settingsService.getMeasurements();
    }

    ngOnInit() {
    }

    setUnitFormat() {
        if (this.userSettings.unitType !== 3) {
            for (const key in this.userSettings) {
                if (this.userSettings.hasOwnProperty(key)) {
                    if (key !== 'timeZone' && key !== 'activityLevel') {
                        this.userSettings[key] = this.userSettings.unitType;
                    }
                }
            }
        }
    }

    checkUnitFormat() {
        const userSettingsArray = [];
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
        }
    }

    saveSettings() {
        this.settingsService.saveSettings(this.userSettings);
    }

}
