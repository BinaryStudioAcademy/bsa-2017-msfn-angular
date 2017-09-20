import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { FoodService } from '../../services/food.service';
import { IFood } from '../../../models/food';
import { FormControl, Validators } from '@angular/forms';
import { ToasterService } from '../../../services/toastr.service';
import { CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';

@Component({
    selector: 'app-food-edit-dialog',
    templateUrl: './food-edit-dialog.component.html',
    styleUrls: ['./food-edit-dialog.component.scss'],
    providers: [FoodService]
})
export class FoodEditDialogComponent implements OnInit {
    public food: IFood;
    public newItem: boolean;
    foodTypes;

    byURL = false;
    // for cropperImg:
    image: any = new Image();
    type: string;
    upd;
    url;
    cropperSettings: CropperSettings;
    outputImage: any;
    @ViewChild('cropper', undefined)
    cropper: ImageCropperComponent;
    hideCropper = true;
    oldImg;
    measures = ['Weight', 'Quantity', 'Liquid'];

    constructor(
        @Inject(MD_DIALOG_DATA) public data: { food: IFood, newItem: boolean },
        private foodService: FoodService,
        private toasterService: ToasterService
    ) {
        this.cropperSettings = foodService.getCropperSettings();
    }

    nameFormControl = new FormControl('', [
        Validators.required,
        Validators.maxLength(50)
    ]);

    descriptionFormControl = new FormControl('', [
        Validators.maxLength(300)
    ]);

    ngOnInit() {
        this.food = Object.assign({}, this.data.food);
        this.food.measure = this.foodService.updateMeasureBack(this.food.measure);
        this.newItem = this.data.newItem;
        this.foodService.getAllFoodTypes((data) => {
            this.foodTypes = data;
        });
        this.outputImage = {};
        this.upd = (+new Date).toString(36);
        if (!this.food.measure) {
            this.food.measure = this.measures[0];
        }
    }

    loadTypeToggle(value: boolean) {
        this.byURL = value;
    }

    loadImage() {
        if (this.byURL) {
            /*this.foodService.getImage(this.url, (data) => {
                console.log(data);
            });*/
            /*
            const img = new Image();
            img.src = this.url;
            img.onload = () => {
                console.log('cool');
                this.hideCropper = false;
                this.cropper.setImage(img.src);
            };
            img.onerror = () => {
                this.toasterService.showMessage('error', 'Wrong URL');
            };*/
        }
    }


    save() {
        if (this.outputImage.image) {
            if (this.newItem) {
                this.food.picture = undefined;
                this.foodService[this.newItem ? 'addFood' : 'updateFood'](this.food, (data) => {
                    this.food = data;
                    const folder = 'food-image';
                    const fileType = 'jpeg';
                    const fileName = this.food._id;
                    this.foodService.saveImg(this.outputImage.image, fileName, fileType, folder, result => {
                        if (result.err) {
                            this.food.picture = this.oldImg;
                            this.toasterService.showMessage('error', result.err);
                        } else {
                            this.food.picture = './resources/' + folder + '/' + fileName + '.' + fileType;
                        }
                        this.foodService.updateFood(this.food, (res) => { });
                        this.upd = (+new Date).toString(36);
                    });
                });
            } else {
                const folder = 'food-image';
                const fileType = 'jpeg';
                const fileName = this.food._id;
                this.foodService.saveImg(this.outputImage.image, fileName, fileType, folder, result => {
                    if (result.err) {
                        this.food.picture = this.oldImg;
                        this.toasterService.showMessage('error', result.err);
                    } else {
                        this.food.picture = './resources/' + folder + '/' + fileName + '.' + fileType;
                        this.foodService.updateFood(this.food, (res) => { });
                        this.upd = (+new Date).toString(36);
                    }
                });
            }

        } else {
            this.foodService[this.newItem ? 'addFood' : 'updateFood'](this.food, (data) => { });
        }


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
                this.food.picture = this.image.src;
                this.outputImage.image = this.image.src;
            } else {
                this.cropper.setImage(this.image);
            }
        };
        myReader.readAsDataURL(file);
    }

    cropperBtn(action) {
        this.oldImg = this.food.picture;
        if (action === 'save') {
            this.food.picture = this.outputImage.image;
        } else {
            this.food.picture = this.oldImg;
            this.outputImage.image = this.oldImg;
        }
        this.hideCropper = true;
    }
}
