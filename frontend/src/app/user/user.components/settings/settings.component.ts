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
        unitTypes: [{ code: 1, name: 'Metric units' }, { code: 2, name: 'Imperial units' }],
        weights: [{ code: 1, name: 'Kg' }, { code: 2, name: 'Lbs' }],
        distances: [{ code: 1, name: 'M' }, { code: 2, name: 'Inches' }, { code: 3, name: 'Km' }],
        temperature: [{ code: 1, name: '°C' }, { code: 2, name: '°F' }],
        timeFormat: [{ code: 1, name: '24-hour clock' }, { code: 2, name: '12-hour clock' }],
        dateFormat: [{ code: 1, name: 'European (day.month.year)' }, { code: 2, name: 'American (month/day/year)' }],
        startWeek: [{ code: 1, name: 'Monday' }, { code: 2, name: 'Saturday' }],
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
    };

    userSettings = {
        unitType: null,
        weight: null,
        trainingWeight: null,
        distance: null,
        temperature: null,
        timeFormat: null,
        dateFormat: null,
        startWeek: null,
        activityLevel: null
    };

    measurements;

    constructor(
        private settingsService: SettingsService,
        private toasterService: ToasterService) {
    }

    ngOnInit() {
        // this.settingsService.getMeasurements();
    }

    setUnitFormat() {
        for (const key in this.userSettings) {
            if (this.userSettings.hasOwnProperty(key)) {
                if (key !== 'activityLevel') {
                    this.userSettings[key] = this.userSettings.unitType;
                }
            }
        }
    }

}
