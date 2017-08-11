import { ForAdminGuard } from './../../guards/for-admin.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ProfileComponent } from '../profile/profile.component';
import { TestSocketsComponent } from '../test-sockets/test-sockets.component';

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [ForAdminGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'test1', component: ProfileComponent },
          { path: 'test2', component: TestSocketsComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  providers: [ForAdminGuard],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
