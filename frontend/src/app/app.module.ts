// @angular
import { ImportModule } from './import.module';
import { NgModule } from '@angular/core';

// other components
import { IsLoggedGuard } from './guards/is-logged.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './services/http.service';
import { ExerciseTypeService } from './services/exercise-type.service';
import { EncryptService } from './services/encrypt.service';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ForgotPasswordMailComponent } from './components/forgot-password-mail/forgot-password-mail.component';
import { TestHttpComponent } from './components/test-http/test-http.component';
import { TestSocketsComponent } from './components/test-sockets/test-sockets.component';
import { HeaderViewComponent } from './components/header-view/header-view.component';
import { WindowObj } from './services/window.service';
import { ForAdminGuard } from './guards/for-admin.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { TestToastrComponent } from './components/test-toastr/test-toastr.component';
import { ToastrService } from './services/toastr.service';
import { ExerciseTypeComponent } from './components/exercise-type/exercise-type.component';
import { IndexPageComponent } from './components/index-page/index-page.component';
import { ListComponent } from './components/list/list.component';
import { AutocompletePipe } from './components/list/autocomplete.pipe';
import { ExerciseListComponent } from './components/exercise-list/exercise-list.component';
import { SidebarViewComponent } from './components/sidebar-view/sidebar-view.component';
import { NotificationDialogComponent } from './components/notification-dialog/notification-dialog.component';
import { ExerciseCreateComponent } from './components/exercise-create/exercise-create.component';

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
        ExerciseListComponent,
        TestToastrComponent,
        SidebarViewComponent,
        NotificationDialogComponent,
        ExerciseCreateComponent
    ],
    imports: [
        ImportModule,
        AppRoutingModule
    ],
    providers: [
        HttpService,
        WindowObj,
        IsLoggedGuard,
        EncryptService,
        ToastrService
    ],
    bootstrap: [AppComponent],
    entryComponents: [ NotificationDialogComponent ]
})
export class AppModule {
}
