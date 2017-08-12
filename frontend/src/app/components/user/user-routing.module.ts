import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent} from './user.component';
import {ProfileComponent} from './user.components/profile/profile.component';
import {ForAllUserGuard} from '../../guards/for-all-user.guard';


const userRoutes: Routes = [
    {
        path: 'user',
        component: UserComponent,
        canActivate: [ForAllUserGuard],
        children: [
            {
               path: 'profile',
                component: ProfileComponent,
            },
        ]
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(userRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class UserRoutingModule { }
