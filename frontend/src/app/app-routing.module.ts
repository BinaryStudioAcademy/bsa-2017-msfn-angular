import {ForgetPasswordComponent} from './components/forget-password/forget-password.component';
import {RestorePasswordComponent} from './components/restore-password/restore-password.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TestHttpComponent} from './components/test-http/test-http.component';
import {HeaderViewComponent} from './components/header-view/header-view.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {LoginComponent} from './components/login/login.component';
import {IndexPageComponent} from './components/index-page/index-page.component';
// import { ForLoggedInGuard } from './guards/for-logged-in.guard';
import {IsLoggedGuard} from './guards/is-logged.guard';
import {ForgotPasswordMailComponent} from './components/forgot-password-mail/forgot-password-mail.component';
import {TestSocketsComponent} from './components/test-sockets/test-sockets.component';
import {ForAdminGuard} from './guards/for-admin.guard';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: IndexPageComponent
    },
    {
        path: 'login',
        children: [],
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegistrationComponent,
        canActivate: [IsLoggedGuard]
    },
    {
        path: 'forget-password', // for testing forgetPasswordComponent, can be removed
        children: [],
        component: ForgetPasswordComponent

    },
    {
        path: 'test-http', // for testing, can be removed
        children: [],
        component: TestHttpComponent
    },
    {
        path: 'header', // for testing
        component: HeaderViewComponent
    },
    {
        path: 'forgot-password-mail',
        component: ForgotPasswordMailComponent
    },
    {
        path: 'restore-password', // for testing restorePasswordComponent, can be removed
        children: [],
        component: RestorePasswordComponent
    },
    {
        path: 'test-socket', // for testing socket.io
        children: [],
        component: TestSocketsComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [
        // ForLoggedInGuard
    ]
})

export class AppRoutingModule {}
