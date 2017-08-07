import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import {LoginComponent} from './components/login/login.component';
// import { ForLoggedInGuard } from './guards/for-logged-in.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'register'
  },
  {
    path: 'login',
    children: [],
    component: LoginComponent
}
  {
    path: 'register',
    component: RegistrationComponent,
    // canActivate: [ForLoggedInGuard]
  },
  {
    path: 'forget-password', // for testing forgetPasswordComponent, can be removed
    children: [],
    component: ForgetPasswordComponent
  },
  {
    path: 'restore-password', // for testing restorePasswordComponent, can be removed
    children: [],
    component: RestorePasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    // ForLoggedInGuard
  ]
})

export class AppRoutingModule { }