import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoginSettingsService } from './login-settings.service';
import { DateService } from '../../../services/date.service';
import { CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';
import { MdDialog } from '@angular/material';
import { ConfirmPasswordDialogComponent } from '../../../components/confirm-password-dialog/confirm-password-dialog.component';
import { WindowObj } from '../../../services/window.service';
import { IUser } from '../../../models/user';
import { ToasterService } from '../../../services/toastr.service';
import { AddNewEmailDialogComponent } from '../../../components/add-new-email-dialog/add-new-email-dialog.component';
import { ChangeRootEmailDialogComponent } from '../../../components/change-root-email-dialog/change-root-email-dialog.component';

@Component({
    selector: 'app-login-settings',
    templateUrl: './login-settings.component.html',
    styleUrls: ['./login-settings.component.scss'],
    providers: [
        LoginSettingsService,
        DateService
    ]
})
export class LoginSettingsComponent implements OnInit {
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

    user: IUser = {
        password: '',
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        birthday: '',
        secondaryEmails: []
    };
    birthday;

    requestForCoaching = false;
    coachingMessage: string;

    constructor(private profileService: LoginSettingsService,
                private formBuilder: FormBuilder,
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
            'email': new FormControl({
                    value: this.user.email,
                    disabled: this.isDisabledEmail
            })
        });
    }

    openAddNewEmailDialog() {
        const dialogRef = this.dialog.open(AddNewEmailDialogComponent, {
        });
        dialogRef.afterClosed().subscribe(email => {
            if (email && email !== this.user.email) {
                this.profileService.addNewEmail(email, this.user._id, res => {
                    if (res.status === 'ok') {
                        this.user.secondaryEmails.push(res.addedEmail);
                    }
                });
            }
        });
    }

    makeRoot(email: string) {
        const dialogRef = this.dialog.open(ChangeRootEmailDialogComponent, {
            data: {
                newRootEmail: email,
                email: this.user.email
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result.status === 'ok') {
                this.user.email = result.operationResult.newRootMail;
                this.user.secondaryEmails = result.operationResult.newSecondaryEmails;
            }
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
