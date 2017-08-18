import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { ImportModule } from '../import.module';
import { UserComponent } from './user.component';
import { SidebarViewComponent } from '../components/sidebar-view/sidebar-view.component';
import { ProfileComponent } from './user.components/profile/profile.component';
import { ForAllUserGuard } from '../guards/for-all-user.guard';
import { TrainingListComponent } from './user.components/training-list/training-list.component';
import { SettingsComponent } from './user.components/settings/settings.component';
import { IntervalTrainingPlanComponent } from './user.components/interval-training-plan/interval-training-plan.component';
import { PlanDetailComponent } from './user.components/plan-detail/plan-detail.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ImportModule,
        UserRoutingModule,
    ],
    declarations: [
        SidebarViewComponent,
        UserComponent,
        ProfileComponent,
        TrainingListComponent,
        SettingsComponent,
        IntervalTrainingPlanComponent,
        PlanDetailComponent,
    ],
    providers: [
        ForAllUserGuard,
    ]
})
export class UserModule {
}
