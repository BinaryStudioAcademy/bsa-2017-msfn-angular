import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdButtonToggleModule, MdListModule, MdPaginatorModule } from '@angular/material';

import { UserRoutingModule } from './user-routing.module';
import { ImportModule } from '../import.module';
import { UserComponent } from './user.component';
import { SidebarViewComponent } from '../components/sidebar-view/sidebar-view.component';
import { ProfileComponent } from './user.components/profile/profile.component';
import { ForAllUserGuard } from '../guards/for-all-user.guard';
import { TrainingListComponent } from './user.components/training-list/training-list.component';
import { SettingsComponent } from './user.components/settings/settings.component';
import { IntervalTrainingPlanComponent } from './user.components/interval-training-plan/interval-training-plan.component';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { OtherProfilesComponent } from './user.components/other-profiles/other-profiles.component';
import { AccountSettingsComponent } from './user.components/account-settings/account-settings.component';
import { LoginSettingsComponent } from './user.components/login-settings/login-settings.component';
import { PlanDetailComponent } from './user.components/plan-detail/plan-detail.component';
import { SearchExerciseComponent } from './user.components/search-exercise/search-exercise.component';
import { ExerciseEditDialogComponent } from './user.components/exercise-edit-dialog/exercise-edit-dialog.component';
import { WeightControlComponent } from './user.components/weight-control/weight-control.component';
import { DashboardComponent } from './user.components/dashboard/dashboard.component';
import { MiscComponent } from './user.components/account-settings/misc/misc.component';
import { UserListComponent } from './user.components/user-list/user-list.component';
import { ExerciseTableComponent } from './user.components/exercise-table/exercise-table.component';
import { ExerciseDescriptionComponent } from './user.components/exercise-description/exercise-description.component';
import { MarkdownService } from '../services/markdown.service';
import { PrivacyComponent } from './user.components/account-settings/privacy/privacy.component';
import { ExerciseListComponent } from './user.components/exercise-list/exercise-list.component';
import { SecundomerComponent } from './user.components/active-training/active-training.components/secundomer/secundomer.component';
import { FinishDialogComponent } from './user.components/active-training/active-training.components/finish-dialog/finish-dialog.component';
// tslint:disable-next-line:max-line-length
import { ChooseTrainDialogComponent } from './user.components/active-training/active-training.components/choose-train-dialog/choose-train-dialog.component';
import { ActiveTrainingComponent } from './user.components/active-training/active-training.component';
import { DbWeightControlComponent } from './user.components/dashboard/dashboard.components/db-weight-control/db-weight-control.component';
import { DbCaloriesComponent } from './user.components/dashboard/dashboard.components/db-calories/db-calories.component';
import { DbEventsComponent } from './user.components/dashboard/dashboard.components/db-events/db-events.component';
import { DbFoodPlanComponent } from './user.components/dashboard/dashboard.components/db-food-plan/db-food-plan.component';
import { DbNewsComponent } from './user.components/dashboard/dashboard.components/db-news/db-news.component';
import { DbGoalsComponent } from './user.components/dashboard/dashboard.components/db-goals/db-goals.component';
import { GoalComponent } from './user.components/goal/goal.component';
import { GoalEditDialogComponent } from './user.components/goal-edit-dialog/goal-edit-dialog.component';
import { PlansComponent } from './user.components/plans/plans.component';
import { SharedPlanDetailComponent } from './user.components/shared-plan-detail/shared-plan-detail.component';
<<<<<<< HEAD
import { ArticleAddComponent } from './user.components/article-add/article-add.component';
import { ArticleDetailComponent } from './user.components/article-detail/article-detail.component';
=======
import { TrainingHistoryComponent } from './user.components/training-history/training-history.component';
>>>>>>> 695dde7085a587909f4785a02002e723fe609d18

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ImportModule,
        UserRoutingModule,
        MdButtonToggleModule,
        InfiniteScrollModule,
        MdPaginatorModule
    ],
    declarations: [
        SidebarViewComponent,
        UserComponent,
        ProfileComponent,
        TrainingListComponent,
        SettingsComponent,
        IntervalTrainingPlanComponent,
        OtherProfilesComponent,
        AccountSettingsComponent,
        LoginSettingsComponent,
        PlanDetailComponent,
        SearchExerciseComponent,
        ExerciseEditDialogComponent,
        WeightControlComponent,
        DashboardComponent,
        MiscComponent,
        UserListComponent,
        PrivacyComponent,
        ExerciseTableComponent,
        ExerciseDescriptionComponent,
        ExerciseListComponent,
        SecundomerComponent,
        FinishDialogComponent,
        ChooseTrainDialogComponent,
        ActiveTrainingComponent,
        DbWeightControlComponent,
        DbCaloriesComponent,
        DbEventsComponent,
        DbFoodPlanComponent,
        DbNewsComponent,
        DbGoalsComponent,
        GoalComponent,
        GoalEditDialogComponent,
        PlansComponent,
        SharedPlanDetailComponent,
<<<<<<< HEAD
        ArticleAddComponent,
        ArticleDetailComponent,
=======
        TrainingHistoryComponent,
>>>>>>> 695dde7085a587909f4785a02002e723fe609d18
    ],
    providers: [
        ForAllUserGuard,
        MarkdownService
    ],
    entryComponents: [
        FinishDialogComponent,
        ChooseTrainDialogComponent,
        ExerciseDescriptionComponent,
        GoalEditDialogComponent
    ]
})
export class UserModule {
}
