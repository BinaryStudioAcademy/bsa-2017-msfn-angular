import { ExerciseTypeComponent } from './components/exercise-type/exercise-type.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestHttpComponent } from './components/test-http/test-http.component';
import { HeaderViewComponent } from './components/header-view/header-view.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { IndexPageComponent } from './components/index-page/index-page.component';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';
import { IsLoggedOutGuard } from './guards/is-logged-out.guard';
import { ForAdminGuard } from './guards/for-admin.guard';
import { ForgotPasswordMailComponent } from './components/forgot-password-mail/forgot-password-mail.component';
import { TestSocketsComponent } from './components/test-sockets/test-sockets.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TestToastrComponent } from './components/test-toastr/test-toastr.component';
import { SidebarViewComponent } from './components/sidebar-view/sidebar-view.component';
import { ExerciseCreateComponent } from './components/exercise-create/exercise-create.component';
import { AdminComponent } from './components/admin/admin.component';
import { ExerciseListComponent } from './components/exercise-list/exercise-list.component';
import { TestMarkdownComponent } from './components/test-markdown/test-markdown.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: IndexPageComponent,
        canActivate: [IsLoggedOutGuard]
    },
    {
        path: 'login',
        children: [],
        component: LoginComponent,
        canActivate: [IsLoggedOutGuard]
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
        path: 'test-socket', // for testing socket.io
        component: TestSocketsComponent
    },
    // {
    //     path: 'exercise-type', // can be removed
    //     children: [],
    //     component: ExerciseTypeComponent
    // },
    {
        path: 'profile',
        children: [],
        component: ProfileComponent,
        canActivate: [IsLoggedInGuard]
    }, {
        path: 'test-toastr', // for testing, can be removed
        children: [],
        component: TestToastrComponent
    }, {
        path: 'sidebar', // for testing
        component: SidebarViewComponent
    },
    {
        path: 'admin',
        children: [],
        component: AdminComponent,
        canActivate: [ForAdminGuard]
    },
    {
        path: 'test-markdown',
        component: TestMarkdownComponent
    }, {
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
