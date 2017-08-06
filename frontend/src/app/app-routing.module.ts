import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestHttpComponent } from './components/test-http/test-http.component';

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
    }, {
      path: 'test-http', // for testing, can be removed
      children: [],
      component: TestHttpComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
