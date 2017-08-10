import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { Test1Component } from './admin.components/test1/test1.component';
import { Test2Component } from './admin.components/test2/test2.component';

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'test1', component: Test1Component },
          { path: 'test2', component: Test2Component }
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
