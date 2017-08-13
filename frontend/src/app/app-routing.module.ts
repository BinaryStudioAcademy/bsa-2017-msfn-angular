import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { TestHttpComponent } from './components/test-http/test-http.component';
import { HeaderViewComponent } from './components/header-view/header-view.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { IndexPageComponent } from './components/index-page/index-page.component';
import { IsLoggedOutGuard } from './guards/is-logged-out.guard';
import { ForAdminGuard } from './guards/for-admin.guard';
import { ForgotPasswordMailComponent } from './components/forgot-password-mail/forgot-password-mail.component';
import { TestSocketsComponent } from './components/test-sockets/test-sockets.component';
import { TestToastrComponent } from './components/test-toastr/test-toastr.component';
import { TestMarkdownComponent } from './components/test-markdown/test-markdown.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserComponent } from './user/user.component';
import { ForAllUserGuard } from './guards/for-all-user.guard';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: IndexPageComponent,
    },
    {
        path: 'register',
        component: RegistrationComponent,
        canActivate: [IsLoggedOutGuard]
    },
    {
        path: 'forget-password', // for testing forgetPasswordComponent, can be removed
        children: [],
        component: ForgetPasswordComponent,
        canActivate: [IsLoggedOutGuard]
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
        component: ForgotPasswordMailComponent,
        canActivate: [IsLoggedOutGuard]
    },
    {
        path: 'restore-password', // for testing restorePasswordComponent, can be removed
        children: [],
        component: RestorePasswordComponent,
        canActivate: [IsLoggedOutGuard]
    },
    {
        path: 'restore-password/:code', // for testing restorePasswordComponent, can be removed
        children: [],
        component: RestorePasswordComponent
    },
    {
        path: 'test-socket', // for testing socket.io
        component: TestSocketsComponent
    },
    {
        path: 'test-toastr', // for testing, can be removed
        children: [],
        component: TestToastrComponent
    },
    {
        path: 'admin',
        children: [],
        component: AdminComponent,
        canActivate: [ForAdminGuard]
    },
    {
        path: 'user',
        children: [],
        component: UserComponent,
        canActivate: [ForAllUserGuard]
    },
    {
        path: 'test-markdown',
        component: TestMarkdownComponent
    },
    {
        path: 'notfound',
        component: PageNotFoundComponent
    }, {
        path: '**',
        redirectTo: 'notfound'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
