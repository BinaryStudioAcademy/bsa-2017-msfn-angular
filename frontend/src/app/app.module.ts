import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './services/http.service';
import { LoginComponent } from './components/login/login.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { TestHttpComponent } from './components/test-http/test-http.component';

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
import { HeaderViewComponent } from './components/header-view/header-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetPasswordComponent,
    TestHttpComponent,
    HeaderViewComponent
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
    FormsModule,
    HttpModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
