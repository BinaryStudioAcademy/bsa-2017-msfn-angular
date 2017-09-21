import { ActivatedRoute } from '@angular/router';
import { TribeService } from '../../../tribe.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';
import { HttpService } from '../../../../../../services/http.service';
import { MdDialog } from '@angular/material';
import { WindowObj } from '../../../../../../services/window.service';
import { ToasterService } from '../../../../../../services/toastr.service';
import { ImageUploadComponent } from '../../../../image-upload/image-upload.component';
@Component({
    selector: 'app-general-settings',
    templateUrl: './general-settings.component.html',
    styleUrls: ['./general-settings.component.scss'],
    providers: [TribeService]
})
export class GeneralSettingsComponent implements OnInit {
    trueTribe = {
        name: 'hi',
        description: 'go',
        image: null,
    };
    tribeID: any;

    // for cropperImg
    cropperSettings: CropperSettings;
    image: any;
    data = {
        image: null
    };
    @ViewChild('cropper', undefined)
    cropper: ImageCropperComponent;
    hideCropper = true;
    userId = (this.window.data._injectedData as any).userId;

    constructor(
        private httpService: HttpService,
        private dialog: MdDialog,
        private window: WindowObj,
        private toasterService: ToasterService,
        private tribeService: TribeService,
        private activatedRoute: ActivatedRoute) {
        this.userId = (this.window.data._injectedData as any).userId;
        this.tribeID = this.activatedRoute.snapshot.params.id;
    }

    ngOnInit() {
        console.log(this.tribeID);
        if (this.tribeID) {
            this.tribeService.getTribe(this.tribeID, (resp) => {
                this.trueTribe = resp;
                console.log(this.trueTribe);
                this.image = this.trueTribe.image || '../resources/default.png';
                this.data = {
                    image: this.image
                };
                this.cropperSettings = this.tribeService.getCropperSettings();
                console.log(this.data.image);
            });
        }
    }


    chooseFileModal(event) {
        if (event.isTrusted) {
            event.preventDefault();
            const dialogRef = this.dialog.open(ImageUploadComponent,
                {
                    data: {
                        event: event
                    }
                }
            );
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.handleFileUrl(result);
                }
            });
        }
    }

    handleFileUrl(url) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        this.hideCropper = false;

        xhr.onreadystatechange = () => {

            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const fileName = url.split('/').pop();
                    const image: any = new Image();

                    const myReader: FileReader = new FileReader();
                    myReader.onloadend = (loadEvent: any) => {
                        image.src = loadEvent.target.result;
                        image.onerror = () => {
                            this.hideCropper = true;
                        };
                        this.cropper.setImage(image);
                    };
                    myReader.onerror = () => {
                        this.hideCropper = true;
                    };

                    myReader.readAsDataURL(xhr.response);
                } else {
                    this.hideCropper = true;
                }
            }
        };
        xhr.onerror = () => {
            this.hideCropper = true;
        };

        xhr.send();
    }

    // for cropperImg:
    fileChangeListener($event) {
        this.hideCropper = false;
        const image: any = new Image();
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
        myReader.onloadend = (loadEvent: any) => {
            image.src = loadEvent.target.result;
            this.cropper.setImage(image);
        };

        myReader.readAsDataURL(file);
    }

    saveImg(event) {
        if (event === 'save') {
            if (!this.hideCropper) {
                this.tribeService.saveImg(this.data.image, this.tribeID, 'img', 'tribe-image', result => {
                    if (result.err) {
                        this.data.image = this.image;
                        this.toasterService.showMessage('error', result.err);
                    } else {
                        this.image = this.data.image;
                        this.toasterService.showMessage('success', null);
                    }
                    this.hideCropper = true;
                });
            }
        } else if (event === 'cancel') {
            this.data = {
                image: this.image
            };
            this.hideCropper = true;
        }
    }

    onSubmit() {
        console.log(this.trueTribe);
        this.tribeService.updateTribe(this.trueTribe, (res) => {
            this.toasterService.showMessage('success', 'Tribe updated');
        });
    }
}

