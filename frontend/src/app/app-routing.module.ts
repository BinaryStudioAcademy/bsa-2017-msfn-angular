import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SportsModificationComponent } from './components/sports-modification/sports-modification.component';

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
    path: 'sports-modification',
    component: SportsModificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
