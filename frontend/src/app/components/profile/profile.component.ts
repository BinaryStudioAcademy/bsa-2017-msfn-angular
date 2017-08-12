import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProfileService } from './profile.service';
import { HttpClient } from '@angular/common/http';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { MdDialog } from '@angular/material';
import { ConfirmPasswordDialogComponent } from '../confirm-password-dialog/confirm-password-dialog.component';
import { WindowObj } from './../../services/window.service';
import { IUser } from '../../models/user';
import { AddNewEmailDialogComponent } from '../add-new-email-dialog/add-new-email-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {
  months = [];
  days = [];
  years = [];
  private profileForm;
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

  requestForCoaching = false;
  coachingMessage: string;

  constructor(private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dialog: MdDialog,
    private window: WindowObj
  ) {
    this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.cropperSettings.width = 150;
    this.cropperSettings.height = 150;
    this.cropperSettings.croppedWidth = 150;
    this.cropperSettings.croppedHeight = 150;
    this.cropperSettings.canvasWidth = 400;
    this.cropperSettings.canvasHeight = 300;
    this.cropperSettings.rounded = true;
    this.cropperSettings.dynamicSizing = true;
    this.cropperSettings.touchRadius = 10;

    this.data = {
      image: this.image
    };
  }

  ngOnInit() {
    this.profileService.getUser(this.userId, res => {
      this.user = res;
      this.months = this.profileService.getMonth();
      this.days = this.profileService.getDays(this.user.month, this.user.year);
      this.years = this.profileService.getYears();
      this.requestForCoaching = this.user.hasOwnProperty('requestForCoaching');
      this.buildForm();
    });
  }

  buildForm() {
    this.profileForm = this.formBuilder.group({
      'firstName': [this.user.firstName, Validators.compose([Validators.required, Validators.minLength(2)])],
      'lastName': [this.user.lastName, Validators.compose([Validators.required, Validators.minLength(2)])],
      'email': new FormControl({ value: this.user.email, disabled: this.isDisabledEmail }),
      'weight': [this.user.weight, Validators.compose([Validators.required, Validators.min(30), Validators.max(300)])],
      'height': [this.user.height, Validators.compose([Validators.required, Validators.min(100), Validators.max(300)])],
    });
  }

  onSelect(month: string, year: number) {
    this.days = this.profileService.getDays(month, year);
  }

  onSubmit(user) {
    user.day = this.user.day;
    user.year = this.user.year;
    user.month = this.user.month;
    this.profileService.updateUser(user, this.user._id);
  }

  openConfirmPasswordDoalog() {
    this.dialog.open(ConfirmPasswordDialogComponent);
  }

  openAddNewEmailDialog() {
    const userData = this.window.data._injectedData;
    const dialogRef = this.dialog.open(AddNewEmailDialogComponent, {
    });
    dialogRef.afterClosed().subscribe(email => {
      if (email) {
        // const user.$addToSet = {secondaryEmails: email};
        // const user = {
        //   secondaryEmails: $addToSet [
        //     email
        //   ]
        // };
        this.profileService.addNewEmail(email, this.user._id);
      }
    });
  }

  // for cropperImg:
  fileChangeListener($event) {
    this.hideCropper = false;
    const image: any = new Image();
    const file: File = $event.target.files[0];
    if ($event.target.files === 0) { return; }
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
          if (result.statusCode === 201) {
            this.image = this.data.image;
          } else {
            this.data.image = this.image;
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

  applyForCoaching() {
    const userData = {
      requestForCoaching: true
    };
    this.requestForCoaching = true;

    this.profileService.updateProfile(
      userData,
      () => {
        this.coachingMessage = 'We\'ll moderate your request in 24 hours. You\'ll get a notification when it would be done.';
      },
      () => {
        this.coachingMessage = 'Request was unsuccessful. Please try again.';
      });
  }
}
