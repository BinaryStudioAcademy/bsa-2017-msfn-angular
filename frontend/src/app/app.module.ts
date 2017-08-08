import { IsLoggedGuard } from './guards/is-logged.guard';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpService} from './services/http.service';
import {HttpClientModule} from '@angular/common/http';
import {RegistrationComponent} from './components/registration/registration.component';
import {LoginComponent} from './components/login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RestorePasswordComponent} from './components/restore-password/restore-password.component';
import {ForgetPasswordComponent} from './components/forget-password/forget-password.component';
import { ForgotPasswordMailComponent } from './components/forgot-password-mail/forgot-password-mail.component';
import {TestHttpComponent} from './components/test-http/test-http.component';
import { WindowObj } from './services/window.service';

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
  MdSlideToggleModule
} from '@angular/material';
import {HeaderViewComponent} from './components/header-view/header-view.component';
import 'hammerjs';
import { IndexPageComponent } from './components/index-page/index-page.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ForgetPasswordComponent,
    TestHttpComponent,
    HeaderViewComponent,
    RestorePasswordComponent,
    OAuthComponent,
    IndexPageComponent,
    ForgotPasswordMailComponent
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
    HttpModule
  ],
  providers: [HttpService, WindowObj, IsLoggedGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
