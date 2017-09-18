import { NgModule } from '@angular/core';

// module
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageCropperModule } from 'ng2-img-cropper';
import { SortablejsModule } from 'angular-sortablejs';
import { ToastrModule } from 'ngx-toastr';
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
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
    MdTabsModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdButtonToggleModule,
    MdSliderModule,
    MdProgressBarModule,
    MdExpansionModule
} from '@angular/material';
import 'hammerjs';
import { D3Service } from 'd3-ng2-service';

// // components
import { ListComponent } from './components/list/list.component';
import { AutocompletePipe } from './components/list/autocomplete.pipe';
import { CommonModule } from '@angular/common';
import { GCalendarService } from './services/gcalendar.service';

export class MyHammerConfig extends HammerGestureConfig {
    overrides = <any> {
        'pinch': { enable: false },
        'rotate': { enable: false }
    };
}


const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

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
        MdTabsModule,
        SortablejsModule,
        PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG)
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
        MdTabsModule,
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
        MdSliderModule,
        MdProgressBarModule,
        MdExpansionModule,
        PerfectScrollbarModule
    ],
    declarations: [
        ListComponent,
        AutocompletePipe,
    ],
    providers: [
        D3Service,
        GCalendarService,
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: MyHammerConfig
        }
    ]
})

export class ImportModule {

}

