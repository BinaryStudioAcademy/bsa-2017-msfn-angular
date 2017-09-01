import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { SportHandlingService } from './sport-handling.service';
import { ISport } from '../../../models/sport';
import { ToasterService } from '../../../services/toastr.service';
import { MdDialog, MdDialogRef } from '@angular/material';
import { SearchExerciseComponent } from './../../../user/user.components/search-exercise/search-exercise.component';
import { ExerciseDescriptionComponent } from './../../../user/user.components/exercise-description/exercise-description.component';

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
        _id: '',
        name: '',
        description: '',
        icon: this.icons[0]
    };
    generalError: string;
    code;
    sportToPass: ISport;
    titleType = 'Create';
    private searchDialog: MdDialogRef<any> | null;
    exercisesList = [];

    constructor(private sportHandlingService: SportHandlingService,
        private toasterService: ToasterService,
        public router: ActivatedRoute,
        private routerNav: Router,
        private dialog: MdDialog,
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
        if (this.router.snapshot.params.id) {
            this.code = this.router.snapshot.params.id;
            this.titleType = 'Edit';
            this.sportHandlingService.getKindsOfSportByCode(this.code, (data) => {
                if (data instanceof Array) {
                    this.code = null;
                    this.titleType = 'Create';
                } else {
                    this.sport = {
                        _id: data._id,
                        name: data.name,
                        description: data.description,
                        icon: data.icon
                    };
                }
                this.getExercises(this.sport._id);
                console.log(this.exercisesList);
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
            this.putExercises();
        } else {
            this.generalError = 'Please fill in all fields correctly';
        }
    }

    getExercises(id) {
        this.sportHandlingService.getExercisesBySport(id, res => {
            if (res.length === 1 && !res[0].name) {
                this.exercisesList = [];
            } else {
                res.forEach(el => {
                    this.exercisesList.push({exercise: el});
                });
            }
        });
    }

    addExercises() {
        this.searchDialog = this.dialog.open(SearchExerciseComponent, {
            data: {
                currentExercises: this.exercisesList
            }
        });
        this.searchDialog.afterClosed().subscribe((result: string) => {
            this.updateExercises(this.searchDialog.componentInstance.selectedExercises);
        });
    }

    updateExercises(exercises) {
        exercises.forEach(elem => {
            const inArray = this.exercisesList.find((el) => {
                return el.exercise._id === elem._id;
            });
            if (!inArray) {
                const newExercise = {
                    exercise: elem
                };
                this.exercisesList.push(newExercise);
            }
        });
    }

    showDescription(exerciseObj) {
        this.dialog.open(ExerciseDescriptionComponent, {
            data: exerciseObj.exercise
        });
    }

    removeExercise(id) {
        this.exercisesList = this.exercisesList.filter( el => {
            return el.exercise._id !== id;
        });
    }

    putExercises() {
        this.sportHandlingService.removeExercise(this.sport, res => {
            this.exercisesList.forEach(el => {
                this.sportHandlingService.updateExercise(el.exercise._id, this.sport);
            });
        });
    }
}
