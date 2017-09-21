import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { ITribePost } from '../../../../models/tribe-post';
import { CropperSettings, ImageCropperComponent} from 'ng2-img-cropper';
import { ToasterService } from '../../../../services/toastr.service';
import { TribeService } from '../tribe.service';
import { NgForm } from '@angular/forms';
import {NavigationEnd, Router, Event as NavigationEvent, Event, NavigationStart} from '@angular/router';
import {MD_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'app-create-tribe-post',
    templateUrl: './create-tribe-post.component.html',
    styleUrls: ['./create-tribe-post.component.scss'],
    providers: [TribeService]
})
export class CreateTribePostComponent implements OnInit {
    tribePost: ITribePost = {
        title: '',
        image: '',
        text: '',
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
        @Inject(MD_DIALOG_DATA) public tribeData,
        private toasterService: ToasterService,
        private tribeService: TribeService,
        private router: Router
    ) {
        this.tribePost.tribe = this.tribeData.tribeId;
        this.tribePost.author = this.tribeData.userId;
    }

    ngOnInit() {
        this.data = {};
        this.cropperSettings = this.tribeService.getCropperSettings();
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

    save(form: NgForm) {
        if (form.valid) {
            if (this.data.image) {
                const folder = 'tribe-post-image';
                const fileType = 'img';
                const fileName = this.tribePost.title.replace(/ /g, '_') + Date.now();
                this.tribeService.saveImg(this.data.image, fileName, fileType, folder, result => {
                    if (result.err) {
                        this.tribePost.image = this.oldImg;
                        this.toasterService.showMessage('error', result.err);
                    } else {
                        this.tribePost.image = './resources/tribes-image/' + fileName + '.' + this.type;
                        this.tribeService.createPost(this.tribePost, (err, data) => {
                        });
                    }
                });
            }
        } else {
            this.toasterService.showMessage('error', 'Fill in all the fields');
        }
    }
}
