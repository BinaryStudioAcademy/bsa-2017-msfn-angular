import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProfileService } from './profile.service';
import { DateService } from '../../../services/date.service';
import { HttpClient } from '@angular/common/http';
import { CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';
import { MdDialog } from '@angular/material';
import { ConfirmPasswordDialogComponent } from '../../../components/confirm-password-dialog/confirm-password-dialog.component';
import { WindowObj } from '../../../services/window.service';
import { IUser } from '../../../models/user';
import { ToasterService } from '../../../services/toastr.service';
import { AddNewEmailDialogComponent } from '../../../components/add-new-email-dialog/add-new-email-dialog.component';
import { ChangeRootEmailDialogComponent } from '../../../components/change-root-email-dialog/change-root-email-dialog.component';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    providers: [
        ProfileService,
        DateService
    ]
})
export class ProfileComponent implements OnInit {
    public profileForm;
    months = [];
    days = [];
    years = [];
    isDisabledEmail = true;
    userError;

    // for cropperImg:
    cropperSettings: CropperSettings;
    data: any;
    @ViewChild('cropper', undefined)
    cropper: ImageCropperComponent;
    hideCropper = true;
    image = (this.window.data._injectedData as any).userPhoto || './resources/default.png';
    userId = (this.window.data._injectedData as any).userId;

    user: IUser;
    birthday;

    requestForCoaching = false;
    coachingMessage: string;

    constructor(private profileService: ProfileService,
                private formBuilder: FormBuilder,
                private http: HttpClient,
                private dialog: MdDialog,
                private window: WindowObj,
                private dateService: DateService,
                private toasterService: ToasterService) {
        this.cropperSettings = profileService.getCropperSettings();
        this.data = {
            image: this.image
        };
    }


    ngOnInit() {
        this.profileService.getUser(this.userId, res => {
            this.user = res;
            this.birthday = this.dateService.convertDateFromIso(this.user.birthday);
            this.months = this.dateService.generateMonths();
            this.days = this.dateService.generateDays(this.birthday.month, this.birthday.year);
            this.years = this.dateService.generateYears();
            this.requestForCoaching = this.user.hasOwnProperty('requestForCoaching');
            this.buildForm();
        });
    }

    buildForm() {
        this.profileForm = this.formBuilder.group({
            'firstName': [this.user.firstName, Validators.compose([
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(20),
            ])],
            'lastName': [this.user.lastName, Validators.compose([
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(20)
            ])],
            'email': new FormControl({
                    value: this.user.email,
                    disabled: this.isDisabledEmail
            }),
            'weight': [this.user.weight, Validators.compose([
                    Validators.required,
                    Validators.min(30),
                    Validators.max(300)
            ])],
            'height': [this.user.height, Validators.compose([
                    Validators.required,
                    Validators.min(100),
                    Validators.max(300)
            ])],
    });
    }

    onSelect(month: string, year: number) {
        this.days = this.dateService.generateDays(month, year);
    }


    openAddNewEmailDialog() {
        const dialogRef = this.dialog.open(AddNewEmailDialogComponent, {
        });
        dialogRef.afterClosed().subscribe(email => {
            if (email && email !== this.user.email) {
                this.profileService.addNewEmail(email, this.user._id, res => {
                    this.user.secondaryEmails.push(res.email);
                });
            }
        });
    }

    makeRoot(email: string) {
        console.log(email);
        const dialogRef = this.dialog.open(ChangeRootEmailDialogComponent, {
        });
    }
    onSubmit(user) {
        const monthNumber = this.months.indexOf(this.birthday.month) + 1;
        const birthday = this.dateService.convertDateToIso({
            year: this.birthday.year,
            month: monthNumber,
            day: this.birthday.day,
        });
        user.birthday = birthday;
        this.profileService.updateUser(user, this.user._id, res => {
            if (typeof(res) === 'object') {
                this.toasterService.showMessage('success', null);
            } else {
                this.toasterService.showMessage('error', null);
            }
        });
        this.window.data._injectedData.userFirstName = user.firstName;
        this.window.data._injectedData.userLastName = user.lastName;
    }

    openConfirmPasswordDialog() {
        this.dialog.open(ConfirmPasswordDialogComponent);
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
                this.profileService.savePhoto(this.data.image, this.userId, 'img', result => {
                    if (result.err) {
                        this.data.image = this.image;
                        this.toasterService.showMessage('error', result.err);
                    } else {
                        this.image = this.data.image;
                        this.toasterService.showMessage('success', null);
                    }
                    this.hideCropper = true;
                    this.window.data._injectedData.userPhoto = this.image;
                });
            }
        } else if (event === 'cancel') {
            this.data = {
                image: this.image
            };
            this.hideCropper = true;
        }
    }

    applyForCoaching() {
        const userData = {
            requestForCoaching: true
        };
        this.requestForCoaching = true;

        this.profileService.coachStatusRequest(this.userId, (res) => {
            this.coachingMessage = 'We\'ll moderate your request in 24 hours.' + ' You\'ll get a notification when it would be done.';
        });
    }
}
