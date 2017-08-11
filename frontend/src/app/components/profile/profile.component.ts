import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProfileService } from './profile.service';
import { HttpClient } from '@angular/common/http';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import {MdDialog} from '@angular/material';
import {ConfirmPasswordDialogComponent} from '../confirm-password-dialog/confirm-password-dialog.component';

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
  image: string;


  user = {
    name: 'John',
    lastname: 'Smith',
    email: 'john.smith@gmail.com',
    birthday: {
      day: 25,
      month: 'March',
      year: 1996
    },
    weight: 85,
    height: 180,
    password: '123456'
  };

  requestForCoaching = false;

  constructor(private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dialog: MdDialog
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
      image: 'http://via.placeholder.com/150x150'
    };
  }

  ngOnInit() {
    this.buildForm();
    this.months = this.profileService.getMonth();
    this.days = this.profileService.getDays(this.user.birthday.month, this.user.birthday.year);
    this.years = this.profileService.getYears();

    // this.profileService.getProfile(data => {
    //   this.user = data;
    //   this.requestForCoaching = this.user.hasOwnProperty('requestForCoaching');
    // });

    this.requestForCoaching = this.user.hasOwnProperty('requestForCoaching');
  }

  buildForm() {
    this.profileForm = this.formBuilder.group({
      'name': [this.user.name, Validators.compose([Validators.required, Validators.minLength(2)])],
      'lastname': [this.user.lastname, Validators.compose([Validators.required, Validators.minLength(2)])],
      'email': new FormControl({ value: this.user.email, disabled: this.isDisabledEmail }),
      'weight': [this.user.weight, Validators.compose([Validators.required, Validators.min(30), Validators.max(300)])],
      'height': [this.user.height, Validators.compose([Validators.required, Validators.min(100), Validators.max(300)])],
    });
  }

  onSelect(month: string, year: number) {
    this.days = this.profileService.getDays(month, year);
  }

  onSubmit(userModel) {
    userModel.birthday = this.user.birthday;
    const req = this.http.put('/api/user', userModel);
    req.subscribe(
      data => { },
      err => this.userError = err.statusText
    );
  }

  openConfirmPasswordDoalog() {
    this.dialog.open(ConfirmPasswordDialogComponent);
  }

  // for cropperImg:
  fileChangeListener($event) {
    this.hideCropper = false;
    const image: any = new Image();
    const file: File = $event.target.files[0];
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
        this.image = this.data.image;
        this.hideCropper = true;
      }
    } else if (event === 'cancel') {
      this.data = {
        image: this.image || 'http://via.placeholder.com/150x150'
      };
      this.hideCropper = true;
    }
  }

  applyForCoaching() {
    // this.requestForCoaching = true;
    const userData = {
      requestForCoaching: true
    };

    this.profileService.updateProfile(userData, () => {
      this.user['requestForCoaching'] = true;
      this.requestForCoaching = this.user.hasOwnProperty('requestForCoaching');
    });
  }
}
