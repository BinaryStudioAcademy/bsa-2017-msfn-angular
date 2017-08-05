import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './services/http.service';
import { LoginComponent } from './components/login/login.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdSnackBarModule,
  MdChipsModule,
  MdIconModule,
  MdRadioModule,
  MdInputModule,
  MdCheckboxModule,
  MdButtonModule,
  MdDialogModule,
  MdSlideToggleModule
} from '@angular/material';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetPasswordComponent,
    RestorePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MdSnackBarModule,
    MdChipsModule,
    MdIconModule,
    MdRadioModule,
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
