import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
// import { ForLoggedInGuard } from './guards/for-logged-in.guard';

const routes: Routes = [
  {
    path: '',
    children: []
  },
  {
    path: 'register',
    component: RegistrationComponent
    // canActivate: [ForLoggedInGuard]
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
