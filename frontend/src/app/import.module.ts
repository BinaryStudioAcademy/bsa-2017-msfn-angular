import { NgModule } from '@angular/core';

// module
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
    MdSortModule,
    MdTooltipModule,
    MdMenuModule
} from '@angular/material';
import 'hammerjs';

// components
import { ListComponent } from './components/list/list.component';
import { AutocompletePipe } from './components/list/autocomplete.pipe';

@NgModule({
    declarations: [
        ListComponent,
        AutocompletePipe
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        CdkTableModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ImageCropperModule,
        ToastrModule,
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
        MdSortModule,
        MdTooltipModule,
        MdMenuModule
    ]
})

export class ImportModule {

}

