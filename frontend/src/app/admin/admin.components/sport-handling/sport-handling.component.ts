import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { SportHandlingService } from './sport-handling.service';
import { ISport } from '../../models/sport';

@Component({
    selector: 'app-sport-handling',
    templateUrl: './sport-handling.component.html',
    styleUrls: [
        '../../../../globalStyles/materialTheme.scss',
        './sport-handling.component.scss',
    ],
    providers: [
        SportHandlingService
    ]
})

export class SportHandlingComponent implements OnInit {
    sport = {
        name: '',
        description: ''
    };
    generalError: string;
    code: number;
    name: string;
    description: string;
    sportToPass: ISport;

    constructor(public router: ActivatedRoute,
                private sportHandlingService: SportHandlingService) { }

    codeFormControl = new FormControl('', [
        Validators.min(0)
    ]);

    nameFormControl = new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
    ]);

    descriptionFormControl = new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(300)
    ]);

    ngOnInit() {
    }

    save(): void {
        if (this.nameFormControl.valid && this.descriptionFormControl.valid) {
            this.generalError = '';
            this.sportToPass = this.sport;

            if (this.code) {
                this.sportToPass.code = this.code;
                this.sportHandlingService.updateSport(
                    this.code,
                    this.sportToPass,
                    () => console.log('SAVE')
                );
            } else {
                this.sportHandlingService.addSport(
                    this.sportToPass,
                    () => console.log('ADD')
                );
            }
        } else {
            this.generalError = 'Please fill in all fields correctly';
        }
    }
}
