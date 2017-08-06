import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import 'hammerjs';

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
import { SportsModificationComponent } from './components/sports-modification/sports-modification.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetPasswordComponent,
    SportsModificationComponent
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
    MdSlideToggleModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
