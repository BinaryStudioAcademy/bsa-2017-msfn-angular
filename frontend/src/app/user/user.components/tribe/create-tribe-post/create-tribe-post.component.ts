import { Component, OnInit, ViewChild } from '@angular/core';
import { ITribePost } from '../../../../models/tribe-post';
import { CropperSettings, ImageCropperComponent} from 'ng2-img-cropper';
import {ToasterService} from '../../../../services/toastr.service';

@Component({
    selector: 'app-create-tribe-post',
    templateUrl: './create-tribe-post.component.html',
    styleUrls: ['./create-tribe-post.component.scss']
})
export class CreateTribePostComponent implements OnInit {
    tribePost: ITribePost = {
        title: '',
        image: '',
        text: '',
    };

    // for cropperImg:
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
    ) {
    }

    ngOnInit() {
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
                // this.exercise.image = this.image.src;
                this.data.image = this.image.src;
            } else {
                this.cropper.setImage(this.image);
            }
        };
        myReader.readAsDataURL(file);
    }

    cropperBtn(action) {
        this.oldImg = this.tribePost.image;
        if (action === 'save') {
            this.tribePost.image = this.data.image;
        }
        this.hideCropper = true;
    }

    save(form: FormData) {}
}
