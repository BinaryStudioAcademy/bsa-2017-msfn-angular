import { IsLoggedGuard } from './guards/is-logged.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './services/http.service';
import { EncryptService } from './services/encrypt.service';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ForgotPasswordMailComponent } from './components/forgot-password-mail/forgot-password-mail.component';
import { TestHttpComponent } from './components/test-http/test-http.component';
import { TestSocketsComponent } from './components/test-sockets/test-sockets.component';
import { HeaderViewComponent } from './components/header-view/header-view.component';
import { WindowObj } from './services/window.service';
import { ForAdminGuard } from './guards/for-admin.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { ImageCropperModule } from 'ng2-img-cropper';
import { ConfirmPasswordDialogComponent } from './components/confirm-password-dialog/confirm-password-dialog.component'

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
    MdTableModule, MdAutocompleteModule
} from '@angular/material';
import 'hammerjs';
import { ExerciseTypeComponent } from './components/exercise-type/exercise-type.component';
import { IndexPageComponent } from './components/index-page/index-page.component';
import { ListComponent } from './components/list/list.component';
import { AutocompletePipe } from './components/list/autocomplete.pipe';

@NgModule({
    declarations: [
        AppComponent,
        RegistrationComponent,
        LoginComponent,
        ForgetPasswordComponent,
        TestHttpComponent,
        HeaderViewComponent,
        RestorePasswordComponent,
        IndexPageComponent,
        ForgotPasswordMailComponent,
        TestSocketsComponent,
        ListComponent,
        ExerciseTypeComponent,
        AutocompletePipe,
        ProfileComponent,
        ConfirmPasswordDialogComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
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
        ImageCropperModule
    ],
    providers: [
        HttpService,
        WindowObj,
        IsLoggedGuard,
        EncryptService
    ],
    entryComponents: [
        ConfirmPasswordDialogComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
