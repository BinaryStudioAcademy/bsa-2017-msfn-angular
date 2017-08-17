import { TrainingListComponent } from './user.components/training-list/training-list.component';
import { SettingsComponent } from './user.components/settings/settings.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user.component';
import { ProfileComponent } from './user.components/profile/profile.component';
import { ForAllUserGuard } from '../guards/for-all-user.guard';
import { IntervalTrainingPlanComponent } from './user.components/interval-training-plan/interval-training-plan.component';
import { FollowersListComponent } from './user.components/followers-list/followers-list.component';
import { FollowingListComponent } from './user.components/following-list/following-list.component';

import { OtherProfilesComponent } from './user.components/other-profiles/other-profiles.component';

const userRoutes: Routes = [
    {
        path: 'user',
        component: UserComponent,
        canActivate: [ForAllUserGuard],
        children: [
            {
                path: 'profile/me',
                component: ProfileComponent,
            },
            {
                path: 'profile/:id',
                component: OtherProfilesComponent,
            },
            {
                path: 'training-list',
                component: TrainingListComponent,
            },
            {
                path: 'settings',
                component: SettingsComponent
            },
            {
                path: 'interval-training-plan',
                component: IntervalTrainingPlanComponent,
            },
            {
                path: 'followers',
                component: FollowersListComponent,
            },
            {
                path: 'following',
                component: FollowingListComponent,
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
