import { ExerciseCreateComponent } from './../exercise-create/exercise-create.component';
import { ExerciseListComponent } from './../exercise-list/exercise-list.component';
import { ExerciseTypeComponent } from './../exercise-type/exercise-type.component';
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
          {
            path: '',
            redirectTo: 'exercise-list',
            pathMatch: 'full'
          },
          {
            path: 'exercise-type',
            component: ExerciseTypeComponent
          },
          {
            path: 'exercise-list',
            component: ExerciseListComponent
          },
          {
            path: 'exercises',
            component: ExerciseCreateComponent
          },
          {
            path: 'exercises/:id',
            component: ExerciseCreateComponent
          },
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
