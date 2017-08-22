import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { SportHandlingService } from './sport-handling.service';
import { ISport } from '../../../models/sport';
import { ToasterService } from '../../../services/toastr.service';

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
    icons = this.sportHandlingService.icons;
    sport = {
        name: '',
        description: '',
        icon: this.icons[0]
    };
    generalError: string;
    code;
    sportToPass: ISport;
    titleType = 'Create';

    constructor(private sportHandlingService: SportHandlingService,
        private toasterService: ToasterService,
        public router: ActivatedRoute,
        private routerNav: Router
    ) { }


    nameFormControl = new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
    ]);

    descriptionFormControl = new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500)
    ]);

    ngOnInit() {
        console.log(this.router.snapshot.params.id);
        if (this.router.snapshot.params.id) {
            this.code = this.router.snapshot.params.id;
            this.titleType = 'Edit';
            this.sportHandlingService.getKindsOfSportByCode(this.code, (data) => {
                if (data instanceof Array) {
                    this.code = null;
                    this.titleType = 'Create';
                } else {
                    console.log(data);
                    this.sport = {
                        name: data.name,
                        description: data.description,
                        icon: data.icon
                    };
                }
            });
        }
    }

    save(): void {
        if (this.nameFormControl.valid && this.descriptionFormControl.valid) {
            this.generalError = '';
            this.sportToPass = this.sport;

            if (this.code) {
                this.sportToPass.code = Number(this.code);
                this.sportHandlingService.updateSport(this.code, this.sportToPass, res => {
                    if (typeof (res) === 'object') {
                        this.toasterService.showMessage('success', null);
                        this.routerNav.navigateByUrl('/admin/sports-list');
                    } else {
                        this.toasterService.showMessage('error', null);
                    }
                });
            } else {
                this.sportHandlingService.addSport(this.sportToPass, res => {
                    if (typeof (res) === 'object') {
                        this.toasterService.showMessage('success', null);
                        this.routerNav.navigateByUrl('/admin/sports-list');
                    } else {
                        this.toasterService.showMessage('error', null);
                    }
                });
            }
        } else {
            this.generalError = 'Please fill in all fields correctly';
        }
    }
}
