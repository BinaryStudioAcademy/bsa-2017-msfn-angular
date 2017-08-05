import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpService} from './services/http.service';
import {LoginComponent} from './components/login/login.component';
import {ForgetPasswordComponent} from './components/forget-password/forget-password.component';
import {OAuthComponent} from './components/login/o-auth/o-auth.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ForgetPasswordComponent,
        OAuthComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [HttpService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
