import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent} from './user.component';
import {ProfileComponent} from './user.components/profile/profile.component';


const userRoutes: Routes = [
    {
        path: 'user',
        component: UserComponent,
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
