import {ForgetPasswordComponent} from './components/forget-password/forget-password.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';


const routes: Routes = [
    {
        path: '', children: [],
    },
    {
        path: 'forget-password', // for testing forgetPasswordComponent, can be removed
        children: [],
        component: ForgetPasswordComponent
    },
    {
        path: 'login',
        children: [],
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegistrationComponent,
        // canActivate: [ForLoggedInGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }