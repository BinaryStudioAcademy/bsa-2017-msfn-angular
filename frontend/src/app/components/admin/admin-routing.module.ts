import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ProfileComponent } from '../profile/profile.component';
import { TestSocketsComponent } from '../test-sockets/test-sockets.component';
import { AdminRootProfileComponent } from './admin.components/admin-root-profile/admin-root-profile.component';

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'test1', component: ProfileComponent },
          { path: 'test2', component: TestSocketsComponent },
          { path: 'admin-root-profile/:id', component: AdminRootProfileComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
