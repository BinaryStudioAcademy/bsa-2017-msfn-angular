import { Component, OnInit, ViewChild } from '@angular/core';
import { CropperSettings, ImageCropperComponent} from 'ng2-img-cropper';
import { ToasterService } from '../../../../services/toastr.service';
import { TribeService } from '../tribe.service';
import { ITribe } from '../../../../models/tribe';
import { NgForm } from '@angular/forms';
import { WindowObj } from '../../../../services/window.service';

@Component({
    selector: 'app-create-tribe-post',
    templateUrl: './create-tribe.component.html',
    styleUrls: ['./create-tribe.component.scss'],
    providers: [TribeService]
})
export class CreateTribeComponent implements OnInit {
    tribe: ITribe = {
        name: '',
        image: '',
        description: '',
    };
    image: any = new Image();
    type: string;
    cropperSettings: CropperSettings;
    data: any;
    @ViewChild('cropper', undefined)
    cropper: ImageCropperComponent;
    hideCropper = true;
    oldImg;

    constructor(
        private toasterService: ToasterService,
        private window: WindowObj,
        private tribeService: TribeService
    ) {
    }

    ngOnInit() {
        this.data = {};
        this.cropperSettings = this.tribeService.getCropperSettings();
        this.tribe.creator = (this.window.data._injectedData as any).userId;
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
                this.tribe.image = this.image.src;
                this.data.image = this.image.src;
                this.hideCropper = true;
            } else {
                this.cropper.setImage(this.image);
            }
        };
        myReader.readAsDataURL(file);
    }

    cropperBtn(action) {
        if (action === 'save') {
            this.tribe.image = this.data.image;
        }
        this.hideCropper = true;
    }

    save(form: NgForm) {
        if (form.valid) {
            if (this.data.image) {
                const folder = 'tribe-image';
                const fileType = 'img';
                const fileName = this.tribe.name.replace(/ /g, '_') + Date.now();
                this.tribeService.saveImg(this.data.image, fileName, fileType, folder, result => {
                    if (result.err) {
                        this.tribe.image = this.oldImg;
                        this.toasterService.showMessage('error', result.err);
                    } else {
                        this.tribe.image = './resources/articles-image/' + fileName + '.' + this.type;
                        this.tribeService.createTribe(this.tribe, () => {
                        });
                    }
                });
            }
        } else {
            this.toasterService.showMessage('error', 'Fill in all the fields');
        }
    }
}
