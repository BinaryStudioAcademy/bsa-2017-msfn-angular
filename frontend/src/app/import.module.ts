import { NgModule } from '@angular/core';

// module
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageCropperModule } from 'ng2-img-cropper';
import { SortablejsModule } from 'angular-sortablejs';
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
    MdDatepickerModule,
    MdNativeDateModule,
    MdButtonToggleModule
} from '@angular/material';
import 'hammerjs';
import { D3Service } from 'd3-ng2-service';

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
        MdInputModule,
        SortablejsModule,
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
        MdButtonToggleModule,
        ListComponent,
        AutocompletePipe,
        MdDatepickerModule,
        MdNativeDateModule,
        SortablejsModule,
    ],
    declarations: [
        ListComponent,
        AutocompletePipe
    ],
    providers: [
        D3Service
    ]
})

export class ImportModule {

}

