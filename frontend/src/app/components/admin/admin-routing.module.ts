import { ForAdminGuard } from './../../guards/for-admin.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ProfileComponent } from '../user/user.components/profile/profile.component';
import { TestSocketsComponent } from '../test-sockets/test-sockets.component';
import { AdminRootProfileComponent } from './admin.components/admin-root-profile/admin-root-profile.component';
import { UserListComponent } from './admin.components/user-list/user-list.component';
import { ExerciseCreateComponent } from './admin.components/exercise-create/exercise-create.component';
import { ExerciseListComponent } from './admin.components/exercise-list/exercise-list.component';
import { ExerciseTypeComponent } from './admin.components/exercise-type/exercise-type.component';

const adminRoutes: Routes = [
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [ForAdminGuard],
        children: [
            {
                path: 'admin-root-profile/:id',
                component: AdminRootProfileComponent },
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
            {
                path: 'user-list',
                component: UserListComponent
            },
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
