import { GoalComponent } from './user.components/goal/goal.component';
import { TrainingListComponent } from './user.components/training-list/training-list.component';
import { MetricsComponent } from './user.components/account-settings/metrics/metrics.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user.component';
import { ProfileComponent } from './user.components/account-settings/profile/profile.component';
import { ForAllUserGuard } from '../guards/for-all-user.guard';
import { IntervalTrainingPlanComponent } from './user.components/interval-training-plan/interval-training-plan.component';
import { AccountSettingsComponent } from './user.components/account-settings/account-settings.component';
import { OtherProfilesComponent } from './user.components/other-profiles/other-profiles.component';
// import { FriendsComponent } from './user.components/friends/friends.component';
import { LoginSettingsComponent } from './user.components/account-settings/login-settings/login-settings.component';
import { PlanDetailComponent } from './user.components/plan-detail/plan-detail.component';
import { WeightControlComponent } from './user.components/weight-control/weight-control.component';
import { DashboardComponent } from './user.components/dashboard/dashboard.component';
import { MiscComponent } from './user.components/account-settings/misc/misc.component';
import { UserListComponent } from './user.components/user-list/user-list.component';
import { PrivacyComponent } from './user.components/account-settings/privacy/privacy.component';
import { ExerciseTableComponent } from './user.components/exercise-table/exercise-table.component';
import { ActiveTrainingComponent } from './user.components/active-training/active-training.component';
import { PlansComponent } from './user.components/plans/plans.component';
import { SharedPlanDetailComponent } from './user.components/shared-plan-detail/shared-plan-detail.component';
import { CoachComponent } from './user.components/coach/coach.component';
import { ArticleAddComponent } from './user.components/article-add/article-add.component';
import { ArticleDetailComponent } from './user.components/article-detail/article-detail.component';
import { TrainingHistoryComponent } from './user.components/training-history/training-history.component';
import { ArticleListComponent } from './user.components/article-list/article-list.component';
import { FoodPlanComponent } from './user.components/food-plan/food-plan.component';


const userRoutes: Routes = [
    {
        path: 'user',
        component: UserComponent,
        canActivate: [ForAllUserGuard],
        children: [
            {
                path: '',
                component: DashboardComponent,
            },
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
                        component: MetricsComponent
                    },
                    {
                        path: 'profile',
                        component: ProfileComponent,
                    },
                    {
                        path: 'login-settings',
                        component: LoginSettingsComponent,
                    },
                    {
                        path: 'misc',
                        component: MiscComponent,
                    },
                    {
                        path: 'privacy',
                        component: PrivacyComponent,
                    },
                ]
            },
            {
                path: 'profile/:id',
                component: OtherProfilesComponent,
            },
            {
                path: 'interval-training-plan',
                component: IntervalTrainingPlanComponent,
            },
            {
                path: 'training-plan/add',
                component: PlanDetailComponent,
            },
            {
                path: 'training-plan/:id',
                component: PlanDetailComponent,
            },
            {
                path: 'weight-control',
                component: WeightControlComponent
            },
            {
                path: 'all-users',
                component: UserListComponent
            },
            {
                path: 'exercise-table',
                component: ExerciseTableComponent
            },
            {
                path: 'start-training',
                component: ActiveTrainingComponent
            },
            {
                path: 'goals',
                component: GoalComponent
            },
            {
                path: 'plans',
                component: PlansComponent
            },
            {
                path: 'plans/:id',
                component: SharedPlanDetailComponent
            },
            {
                path: 'articles',
                component: ArticleListComponent
            },
            {
                path: 'articles/create',
                component: ArticleAddComponent
            },
            {
                path: 'articles/:id',
                component: ArticleDetailComponent
            },
            {
                path: 'training-history',
                component: TrainingHistoryComponent
            },
            {
                path: 'food/plan/add',
                component: FoodPlanComponent
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
