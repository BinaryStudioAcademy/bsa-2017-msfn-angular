import { CommonModule } from '@angular/common';
// @angular
import { ImportModule } from './import.module';
import { NgModule } from '@angular/core';

// other components
import { IsLoggedInGuard } from './guards/is-logged-in.guard';
import { IsLoggedOutGuard } from './guards/is-logged-out.guard';
import { ForAdminGuard } from './guards/for-admin.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './services/http.service';
import { ExerciseTypeService } from './services/exercise-type.service';
import { EncryptService } from './services/encrypt.service';
import { RegistrationComponent } from './components/registration/registration.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ForgotPasswordMailComponent } from './components/forgot-password-mail/forgot-password-mail.component';
import { TestHttpComponent } from './components/test-http/test-http.component';
import { TestSocketsComponent } from './components/test-sockets/test-sockets.component';
import { HeaderViewComponent } from './components/header-view/header-view.component';
import { WindowObj } from './services/window.service';
import { ProfileComponent } from './components/profile/profile.component';
import { ConfirmPasswordDialogComponent } from './components/confirm-password-dialog/confirm-password-dialog.component';
import { TestToastrComponent } from './components/test-toastr/test-toastr.component';
import { ToasterService } from './services/toastr.service';
import { IndexPageComponent } from './components/index-page/index-page.component';
import { ListComponent } from './components/list/list.component';
import { AutocompletePipe } from './components/list/autocomplete.pipe';
import { GoogleTestComponent } from './components/google-test/google-test.component';
import { SidebarViewComponent } from './components/sidebar-view/sidebar-view.component';
import { NotificationDialogComponent } from './components/notification-dialog/notification-dialog.component';
import { AdminModule } from './admin/admin.module';
import { TestMarkdownComponent } from './components/test-markdown/test-markdown.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';

@NgModule({
    imports: [
        ImportModule,
        AdminModule,
        AppRoutingModule,
        CommonModule
    ],
    declarations: [
        AppComponent,
        RegistrationComponent,
        ForgetPasswordComponent,
        TestHttpComponent,
        HeaderViewComponent,
        RestorePasswordComponent,
        IndexPageComponent,
        ForgotPasswordMailComponent,
        TestSocketsComponent,
        ProfileComponent,
        GoogleTestComponent,
        ConfirmPasswordDialogComponent,
        TestToastrComponent,
        SidebarViewComponent,
        NotificationDialogComponent,
        TestMarkdownComponent,
        PageNotFoundComponent,
        LoginDialogComponent,
    ],
    providers: [
        ToasterService,
        HttpService,
        WindowObj,
        IsLoggedInGuard,
        IsLoggedOutGuard,
        ForAdminGuard,
        EncryptService,
        ExerciseTypeService
    ],
    entryComponents: [
        ConfirmPasswordDialogComponent,
        NotificationDialogComponent,
        LoginDialogComponent
    ],
    bootstrap: [AppComponent]

})
export class AppModule {
}
