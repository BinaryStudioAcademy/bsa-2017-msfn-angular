import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdSnackBarModule,
  MdChipsModule,
  MdIconModule,
  MdRadioModule,
  MdCardModule,
  MdInputModule,
  MdCheckboxModule,
  MdButtonModule,
  MdDialogModule,
  MdSlideToggleModule
} from '@angular/material';
import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    ForgetPasswordComponent,
    LoginComponent,
    OAuthComponent
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
    MdCardModule,
    MdInputModule,
    MdCheckboxModule,
    MdButtonModule,
    MdDialogModule,
    MdSlideToggleModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
