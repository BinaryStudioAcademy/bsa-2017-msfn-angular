import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdButtonToggleModule, MdListModule } from '@angular/material';

import { UserRoutingModule } from './user-routing.module';
import { ImportModule } from '../import.module';
import { UserComponent } from './user.component';
import { SidebarViewComponent } from '../components/sidebar-view/sidebar-view.component';
import { ProfileComponent } from './user.components/profile/profile.component';
import { ForAllUserGuard } from '../guards/for-all-user.guard';
import { TrainingListComponent } from './user.components/training-list/training-list.component';
import { SettingsComponent } from './user.components/settings/settings.component';
import { IntervalTrainingPlanComponent } from './user.components/interval-training-plan/interval-training-plan.component';
import { FollowersListComponent } from './user.components/followers-list/followers-list.component';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { FollowingListComponent } from './user.components/following-list/following-list.component';
import { OtherProfilesComponent } from './user.components/other-profiles/other-profiles.component';
import { AccountSettingsComponent } from './user.components/account-settings/account-settings.component';
import { LoginSettingsComponent } from './user.components/login-settings/login-settings.component';
import { PlanDetailComponent } from './user.components/plan-detail/plan-detail.component';
import { WeightControlComponent } from './user.components/weight-control/weight-control.component';
import { DashboardComponent } from './user.components/dashboard/dashboard.component';
import { MiscComponent } from './user.components/account-settings/misc/misc.component';
import { DbWeightControlComponent } from './user.components/dashboard/dashboard.components/db-weight-control/db-weight-control.component';
import { DbCaloriesComponent } from './user.components/dashboard/dashboard.components/db-calories/db-calories.component';
import { DbEventsComponent } from './user.components/dashboard/dashboard.components/db-events/db-events.component';
import { DbFoodPlanComponent } from './user.components/dashboard/dashboard.components/db-food-plan/db-food-plan.component';
import { DbNewsComponent } from './user.components/dashboard/dashboard.components/db-news/db-news.component';
import { DbGoalsComponent } from './user.components/dashboard/dashboard.components/db-goals/db-goals.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ImportModule,
        UserRoutingModule,
        MdListModule,
        MdButtonToggleModule,
        InfiniteScrollModule,
    ],
    declarations: [
        SidebarViewComponent,
        UserComponent,
        ProfileComponent,
        TrainingListComponent,
        SettingsComponent,
        IntervalTrainingPlanComponent,
        OtherProfilesComponent,
        FollowersListComponent,
        FollowingListComponent,
        AccountSettingsComponent,
        LoginSettingsComponent,
        PlanDetailComponent,
        WeightControlComponent,
        DashboardComponent,
        MiscComponent,
        DbWeightControlComponent,
        DbCaloriesComponent,
        DbEventsComponent,
        DbFoodPlanComponent,
        DbNewsComponent,
        DbGoalsComponent,
    ],
    providers: [
        ForAllUserGuard,
    ]
})
export class UserModule {
}
