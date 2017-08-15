import { CommonModule } from '@angular/common';
// @angular
import { ImportModule } from './import.module';
import { NgModule } from '@angular/core';

// other components
import { IsLoggedInGuard } from './guards/is-logged-in.guard';
import { IsLoggedOutGuard } from './guards/is-logged-out.guard';
import { ForAdminGuard } from './guards/for-admin.guard';
import { ForAllUserGuard } from './guards/for-all-user.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './services/http.service';
import { EncryptService } from './services/encrypt.service';
import { RegistrationComponent } from './components/registration/registration.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { TestHttpComponent } from './components/test-http/test-http.component';
import { TestSocketsComponent } from './components/test-sockets/test-sockets.component';
import { HeaderViewComponent } from './components/header-view/header-view.component';
import { WindowObj } from './services/window.service';
import { ConfirmPasswordDialogComponent } from './components/confirm-password-dialog/confirm-password-dialog.component';
import { TestToastrComponent } from './components/test-toastr/test-toastr.component';
import { ToasterService } from './services/toastr.service';
import { IndexPageComponent } from './components/index-page/index-page.component';
import { GoogleTestComponent } from './components/google-test/google-test.component';
import { NotificationDialogComponent } from './components/notification-dialog/notification-dialog.component';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { TestMarkdownComponent } from './components/test-markdown/test-markdown.component';
import { AddNewEmailDialogComponent } from './components/add-new-email-dialog/add-new-email-dialog.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ChangeRootEmailDialogComponent } from './components/change-root-email-dialog/change-root-email-dialog.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { ConfirmedPageComponent } from './components/confirmed-page/confirmed-page.component';
import { ExerciseTypeService } from './admin/admin.components/exercise-type/exercise-type.service';
import { ConfirmedPageService } from './components/confirmed-page/confirmed-page.service';

@NgModule({
    imports: [
        ImportModule,
        AdminModule,
        UserModule,
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
        TestSocketsComponent,
        GoogleTestComponent,
        ConfirmPasswordDialogComponent,
        TestToastrComponent,
        NotificationDialogComponent,
        TestMarkdownComponent,
        AddNewEmailDialogComponent,
        PageNotFoundComponent,
        ChangeRootEmailDialogComponent,
        ConfirmedPageComponent,
        LoginDialogComponent,
    ],
    providers: [
        ToasterService,
        HttpService,
        WindowObj,
        IsLoggedInGuard,
        IsLoggedOutGuard,
        ForAdminGuard,
        ForAllUserGuard,
        EncryptService,
        ExerciseTypeService,
        ConfirmedPageService
    ],
    entryComponents: [
        ConfirmPasswordDialogComponent,
        NotificationDialogComponent,
        AddNewEmailDialogComponent,
        ChangeRootEmailDialogComponent,
        LoginDialogComponent,
        RegistrationComponent
    ],
    bootstrap: [AppComponent]

})
export class AppModule {
}
