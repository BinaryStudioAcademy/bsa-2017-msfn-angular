import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdButtonToggleModule, MdListModule, MdPaginatorModule } from '@angular/material';

import { UserRoutingModule } from './user-routing.module';
import { ImportModule } from '../import.module';
import { UserComponent } from './user.component';
import { SidebarViewComponent } from './user.components/sidebar-view/sidebar-view.component';
import { ProfileComponent } from './user.components/account-settings/profile/profile.component';
import { ForAllUserGuard } from '../guards/for-all-user.guard';
import { TrainingListComponent } from './user.components/training-list/training-list.component';
import { MetricsComponent } from './user.components/account-settings/metrics/metrics.component';
import { IntervalTrainingPlanComponent } from './user.components/interval-training-plan/interval-training-plan.component';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { OtherProfilesComponent } from './user.components/other-profiles/other-profiles.component';
import { AccountSettingsComponent } from './user.components/account-settings/account-settings.component';
import { LoginSettingsComponent } from './user.components/account-settings/login-settings/login-settings.component';
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
import { ExercisesComponent } from './user.components/exercises/exercises.component';
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
import { CoachComponent } from './user.components/coach/coach.component';
import { CoachSidebarComponent } from './user.components/coach/coach-sidebar/coach-sidebar.component';
import { CoachPostsComponent } from './user.components/coach/coach-posts/coach-posts.component';
import { CoachEventsComponent } from './user.components/coach/coach-events/coach-events.component';
import { CoachArticlesComponent } from './user.components/coach/coach-articles/coach-articles.component';
import { CoachPlansComponent } from './user.components/coach/coach-plans/coach-plans.component';
import { ArticleAddComponent } from './user.components/article-add/article-add.component';
import { ArticleDetailComponent } from './user.components/article-detail/article-detail.component';
import { TrainingHistoryComponent } from './user.components/training-history/training-history.component';
import { TrainingHistoryDetailComponent } from './user.components/training-history-detail/training-history-detail.component';
import { ArticleListComponent } from './user.components/article-list/article-list.component';
import { FoodPlanComponent } from './user.components/food-plan/food-plan.component';
import { FoodPlanListComponent } from './user.components/food-plan-list/food-plan-list.component';
import { FoodTrackingComponent } from './user.components/food-tracking/food-tracking.component';
import { SearchComponent } from './user.components/food-plan/search/search.component';
import { WeeklyComponent } from './user.components/food-plan/weekly/weekly.component';
import { DailyComponent } from './user.components/food-plan/daily/daily.component';
import { ProductListComponent } from './user.components/food-plan/product-list/product-list.component';
import { MessagePostingComponent } from './user.components/message-posting/message-posting.component';
import { AchievementsListComponent } from './user.components/achievements-list/achievements-list.component';
import { AchievementReceivedDialogComponent } from './user.components/achievement-received-dialog/achievement-received-dialog.component';
import { AchievementInfoDialogComponent } from './user.components/achievement-info-dialog/achievement-info-dialog.component';
import { EventCreateComponent } from './user.components/event-create/event-create.component';
import { EventListComponent } from './user.components/event-list/event-list.component';
import { EventItemComponent } from './user.components/event-item/event-item.component';
import { ImageUploadComponent } from './user.components/image-upload/image-upload.component';
import { GeneralComponent } from './user.components/event-item/general/general.component';
import { DiscussComponent } from './user.components/event-item/discuss/discuss.component';
import { PlaceTimeComponent } from './user.components/event-item/place-time/place-time.component';
import { EditPanelComponent } from './user.components/event-item/edit-panel/edit-panel.component';
import {ActivatedRouteSnapshot} from '@angular/router';
import {EventService} from './services/event.service';
import { FoodPlanService } from './user.components/food-plan/food-plan.service';
import { TribePageComponent } from './user.components/tribe/tribe-page/tribe-page.component';
import { TribePostComponent } from './user.components/tribe/tribe-post/tribe-post.component';
import { TribeSettingsComponent } from './user.components/tribe/tribe-settings/tribe-settings.component';
import { CreateTribePostComponent } from './user.components/tribe/create-tribe-post/create-tribe-post.component';
import { FullTribePostComponent } from './user.components/tribe/full-tribe-post/full-tribe-post.component';
import { TribeMembersDialogComponent} from './user.components/tribe/tribe-members-dialog/tribe-members-dialog.component';
import { CreateTribeComponent } from './user.components/tribe/create-tribe/create-tribe.component';
// tslint:disable-next-line:max-line-length
import { GeneralSettingsComponent } from './user.components/tribe/tribe-settings/tribe-settings.components/general-settings/general-settings.component';
import { TribeListComponent } from './user.components/tribe/tribe-list/tribe-list.component';
// tslint:disable-next-line:max-line-length
import { TribePermissionsComponent } from './user.components/tribe/tribe-settings/tribe-settings.components/tribe-permissions/tribe-permissions.component';
import { TribeBanlistComponent } from './user.components/tribe/tribe-settings/tribe-settings.components/tribe-banlist/tribe-banlist.component';
import { SelectUsersDialogComponent } from './user.components/select-users-dialog/select-users-dialog.component';

import { DayTemplateComponent } from './user.components/food-tracking/day-template/day-template.component';

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
        MetricsComponent,
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
        ExercisesComponent,
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
        ArticleListComponent,
        CoachComponent,
        CoachSidebarComponent,
        CoachPostsComponent,
        CoachEventsComponent,
        CoachArticlesComponent,
        CoachPlansComponent,
        ArticleAddComponent,
        ArticleDetailComponent,
        TrainingHistoryComponent,
        TrainingHistoryDetailComponent,
        FoodPlanComponent,
        FoodPlanListComponent,
        FoodTrackingComponent,
        SearchComponent,
        WeeklyComponent,
        DailyComponent,
        ProductListComponent,
        TrainingHistoryDetailComponent,
        MessagePostingComponent,
        AchievementsListComponent,
        AchievementReceivedDialogComponent,
        AchievementInfoDialogComponent,
        EventCreateComponent,
        EventListComponent,
        EventItemComponent,
        ImageUploadComponent,
        GeneralComponent,
        DiscussComponent,
        PlaceTimeComponent,
        EditPanelComponent,
        TribePageComponent,
        TribePostComponent,
        TribeSettingsComponent,
        CreateTribePostComponent,
        FullTribePostComponent,
        TribeMembersDialogComponent,
        CreateTribeComponent,
        TribeListComponent,
        GeneralSettingsComponent,
        TribePermissionsComponent,
        TribeBanlistComponent,
        SelectUsersDialogComponent,
        DayTemplateComponent,
    ],
    providers: [
        ForAllUserGuard,
        MarkdownService,
        EventService,
        FoodPlanService,
    ],
    entryComponents: [
        FinishDialogComponent,
        ChooseTrainDialogComponent,
        ExerciseDescriptionComponent,
        GoalEditDialogComponent,
        AchievementReceivedDialogComponent,
        AchievementInfoDialogComponent,
        SearchComponent,
        ImageUploadComponent,
        FullTribePostComponent,
        TribeMembersDialogComponent,
        CreateTribeComponent,
        SelectUsersDialogComponent,
        DayTemplateComponent,
    ]
})
export class UserModule {
}
