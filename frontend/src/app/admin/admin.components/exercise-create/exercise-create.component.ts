import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ExerciseCreateService } from './exercise-create.service';
import { MarkdownService } from '../../../services/markdown.service';
import IExercise = ExerciseApi.IExercise;
import IExerciseType = ExerciseApi.IExerciseType;
import ISport = SportApi.ISport;
import { CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';
import { ToasterService } from '../../../services/toastr.service';
import { MdDialog, MdDialogRef } from '@angular/material';
import { SelectSportComponent } from '../select-sport/select-sport.component';

@Component({
    selector: 'app-exercise-create',
    providers: [MarkdownService],
    templateUrl: './exercise-create.component.html',
    styleUrls: ['./exercise-create.component.scss']
})
export class ExerciseCreateComponent implements OnInit {
    exercise: IExercise = {
        name: '',
        category: '',
        isRemoved: false,
        sports: [],
        measure: '',
        image: '',
        description: ''
    };
    titleType = 'Create';
    convertedDescription: string;
    exTypes: [IExerciseType];
    exMeasures: [any];
    exSports;
    sportList = [];
    private sportDialog: MdDialogRef<any> | null;

    // for cropperImg:
    image: any = new Image();
    type: string;
    cropperSettings: CropperSettings;
    data: any;
    @ViewChild('cropper', undefined)
    cropper: ImageCropperComponent;
    hideCropper = true;
    oldImg;

    constructor(public router: ActivatedRoute,
        private exerciseCreateService: ExerciseCreateService,
        private markdownService: MarkdownService,
        private toasterService: ToasterService,
        private dialog: MdDialog,
    ) {
        this.cropperSettings = exerciseCreateService.getCropperSettings();
    }

    ngOnInit() {
        if (this.router.snapshot.params.id) {
            this.titleType = 'Edit';
            this.exerciseCreateService.getExerciseById(this.router.snapshot.params.id, (data) => {
                this.exercise = data;
            });
        }
        this.exerciseCreateService.getExerciseTypes((data) => {
            this.exTypes = data;
        });
        this.exerciseCreateService.getMeasures((data) => {
            this.exMeasures = data;
        });
        this.exerciseCreateService.getSportTypes((data) => {
            this.exSports = data;
            this.exSports.forEach(el => {
                if (this.exercise.sports.includes(el._id)) {
                    this.sportList.push(el);
                }
            });
        });
        this.data = {};
    }

    save(form: NgForm) {
        if (form.valid) {
            this.exercise.sports = this.sportList;
            if (this.data.image) {
                const folder = 'exercise-image';
                const fileType = 'img';
                const fileName = this.exercise.category;
                this.exerciseCreateService.saveImg(this.data.image, fileName, fileType, folder, result => {
                    if (result.err) {
                        this.exercise.image = this.oldImg;
                        this.toasterService.showMessage('error', result.err);
                    } else {
                        this.exercise.image = './resources/exercise-image/' + fileName + '.' + this.type;
                        if (this.router.snapshot.params.id) {
                            this.exerciseCreateService.updateExercise(this.router.snapshot.params.id, this.exercise);
                        } else {
                            this.exerciseCreateService.sendExercise(this.exercise);
                        }
                    }
                });
            } else {
                if (this.router.snapshot.params.id) {
                    this.exerciseCreateService.updateExercise(this.router.snapshot.params.id, this.exercise);
                } else {
                    this.exerciseCreateService.sendExercise(this.exercise);
                }
            }
        } else {
            this.toasterService.showMessage('error', 'Fill in all the fields');
        }
    }

    updateOutput(mdText: string) {
        this.convertedDescription = this.markdownService.convert(mdText);
    }

    fileChangeListener($event) {

        this.hideCropper = false;
        const file: File = $event.target.files[0];
        if ($event.target.files === 0) {
            return;
        }
        if (file.type.split('/')[0] !== 'image') {
            this.toasterService.showMessage('error', 'wrong format');
            this.hideCropper = true;
            return;
        }
        const myReader: FileReader = new FileReader();
        this.type = file.type.split('/')[1];

        myReader.onloadend = (loadEvent: any) => {
            this.image.src = loadEvent.target.result;
            if (this.type === 'gif') {
                this.hideCropper = true;
                this.exercise.image = this.image.src;
                this.data.image = this.image.src;
            } else {
                this.cropper.setImage(this.image);
            }
        };
        myReader.readAsDataURL(file);
    }

    cropperBtn(action) {
        this.oldImg = this.exercise.image;
        if (action === 'save') {
            this.exercise.image = this.data.image;
        }
        this.hideCropper = true;
    }

    addSport() {
        this.sportDialog = this.dialog.open(SelectSportComponent, {
            data: this.sportList
        });
        this.sportDialog.afterClosed().subscribe((result: string) => {
            this.updateSports(this.sportDialog.componentInstance.selectedSports);
        });
    }

    updateSports(sports) {
        sports.forEach(elem => {
            const inArray = this.sportList.find((el) => {
                return el._id === elem._id;
            });
            if (!inArray) {
                this.sportList.push(elem);
            }
        });
    }

    removeSport(id) {
        this.sportList = this.sportList.filter(el => {
            return el._id !== id;
        });
    }
}
