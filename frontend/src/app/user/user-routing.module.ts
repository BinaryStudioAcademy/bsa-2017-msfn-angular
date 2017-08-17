import { TrainingListComponent } from './user.components/training-list/training-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent} from './user.component';
import { ProfileComponent } from './user.components/profile/profile.component';
import { ForAllUserGuard } from '../guards/for-all-user.guard';
import { WeightControlComponent } from './user.components/weight-control/weight-control.component';

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
            {
                path: 'training-list',
                component: TrainingListComponent,
            },
            {
                path: 'weight-control',
                component: WeightControlComponent,
            }
        ]
    }
];
@NgModule({
    imports: [
        RouterModule.forRoot(userRoutes, { enableTracing: true }),
    ],
    exports: [
        RouterModule
    ],
    providers: [
        ForAllUserGuard
    ]
})
export class UserRoutingModule { }
