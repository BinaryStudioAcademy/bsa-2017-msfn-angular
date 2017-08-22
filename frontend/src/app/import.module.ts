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
    MdMenuModule,
    MdListModule,
} from '@angular/material';
import 'hammerjs';

// // components
import { ListComponent } from './components/list/list.component';
import { AutocompletePipe } from './components/list/autocomplete.pipe';
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        ToastrModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        MdChipsModule,
        MdIconModule,
        MdAutocompleteModule,
        MdInputModule
    ],
    exports: [
        MdIconModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule,
        CdkTableModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ImageCropperModule,
        MdSnackBarModule,
        MdChipsModule,
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
        MdMenuModule,
        MdListModule,
        ListComponent,
        AutocompletePipe
    ],
    declarations: [
        ListComponent,
        AutocompletePipe
    ],
})

export class ImportModule {

}

