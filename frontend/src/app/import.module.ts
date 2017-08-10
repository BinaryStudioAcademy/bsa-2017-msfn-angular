import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageCropperModule } from 'ng2-img-cropper';
import { ToastrModule } from 'ngx-toastr';
import {
    MdSnackBarModule,
    MdChipsModule,
    MdIconModule,
    MdRadioModule,
    MdSelectModule,
    MdCardModule,
    MdInputModule,
    MdCheckboxModule,
    MdButtonModule,
    MdDialogModule,
    MdSlideToggleModule,
    MdTableModule,
    MdAutocompleteModule,
    MdSortModule
} from '@angular/material';
import 'hammerjs';

export const ImportModule = [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MdSnackBarModule,
    MdChipsModule,
    MdIconModule,
    MdRadioModule,
    MdSelectModule,
    MdCardModule,
    MdInputModule,
    MdCheckboxModule,
    MdButtonModule,
    MdDialogModule,
    MdSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MdTableModule,
    CdkTableModule,
    MdAutocompleteModule,
    ImageCropperModule,
    MdSortModule,
    ToastrModule.forRoot({
        timeOut: 5000,
        positionClass: 'toast-bottom-right'
    })
];
