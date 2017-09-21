import { ActivatedRoute } from '@angular/router';
import { TribeService } from './../../../tribe.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { CropperSettings, ImageCropperComponent } from 'ng2-img-cropper';
import { HttpService } from '../../../../../../services/http.service';
import { MdDialog } from '@angular/material/material';
import { WindowObj } from '../../../../../../services/window.service';
import { ToasterService } from '../../../../../../services/toastr.service';
@Component({
  selector: 'app-general-settings',
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.scss']
})
export class GeneralSettingsComponent implements OnInit {
  trueTribe: any;
  tribeID: any;
  public profileForm;
  months = [];
  days = [];
  years = [];
  isDisabledEmail = true;
  userError;

  // for cropperImg
  cropperSettings: CropperSettings;
  data: any;
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;
  hideCropper = true;
  image = (this.window.data._injectedData as any).userPhoto || '../resources/default.png';
  userId = (this.window.data._injectedData as any).userId;
  birthday;
  activityLevelOptions;

  requestForCoaching = false;
  coachingMessage: string;

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
    console.log(this.trueTribe);
    if (this.tribeID) {
      this.tribeService.getTribe(this.tribeID, (resp) => {
        this.trueTribe = resp;
        console.log(this.trueTribe);
      });
    }
  }

}

