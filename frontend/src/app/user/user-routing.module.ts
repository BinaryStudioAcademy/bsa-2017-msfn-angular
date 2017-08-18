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
import { AccountSettingsComponent } from './user.components/account-settings/account-settings.component';
import { OtherProfilesComponent } from './user.components/other-profiles/other-profiles.component';
import { FriendsComponent } from './user.components/friends/friends.component';
import { LoginSettingsComponent } from './user.components/login-settings/login-settings.component';

const userRoutes: Routes = [
    {
        path: 'user',
        component: UserComponent,
        canActivate: [ForAllUserGuard],
        children: [
            {
                path: 'training-list',
                component: TrainingListComponent,
            },
            {
                path: 'account-settings',
                component: AccountSettingsComponent,
                children: [
                    {
                        path: 'settings',
                        component: SettingsComponent
                    },
                    {
                        path: 'profile',
                        component: ProfileComponent,
                    },
                    {
                        path: 'login-settings',
                        component: LoginSettingsComponent,
                    },
                ]
            },
            {
                path: 'friends',
                component: FriendsComponent,
                children: [
                    {
                        path: 'followers',
                        component: FollowersListComponent,
                    },
                    {
                        path: 'following',
                        component: FollowingListComponent,
                    },
                    {
                        path: 'profile/:id',
                        component: OtherProfilesComponent,
                    },
                ]
            },
            {
                path: 'interval-training-plan',
                component: IntervalTrainingPlanComponent,
            },
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
