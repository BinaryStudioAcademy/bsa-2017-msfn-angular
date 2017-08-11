import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent} from './user.component';
import {TestU1Component} from './user.components/test-u1/test-u1.component';
import {TestU2Component} from './user.components/test-u2/test-u2.component';


const userRoutes: Routes = [
    {
        path: 'user',
        component: UserComponent,
        children: [
            {
               path: 'test1',
                component: TestU1Component,
            },
            {
                path: 'test2',
                component: TestU2Component,
            }
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
