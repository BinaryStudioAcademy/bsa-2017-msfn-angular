import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'forget-password',
    pathMatch: 'full'
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
  exports: [RouterModule]
})
export class AppRoutingModule { }
