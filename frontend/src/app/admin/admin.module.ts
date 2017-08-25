import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ImportModule } from '../import.module';
import { AdminComponent } from './admin.component';
import { UserListComponent } from './admin.components/user-list/user-list.component';
import { ExerciseCreateComponent } from './admin.components/exercise-create/exercise-create.component';
import { ExerciseListComponent } from './admin.components/exercise-list/exercise-list.component';
import { ExerciseTypeComponent } from './admin.components/exercise-type/exercise-type.component';
import { AdminRootProfileComponent } from './admin.components/admin-root-profile/admin-root-profile.component';
import { MeasureListComponent } from './admin.components/measure-list/measure-list.component';

import { AdminRoutingModule } from './admin-routing.module';

import { ToasterService } from '../services/toastr.service';
import { AdminRootProfileService } from './admin.components/admin-root-profile/admin-root-profile.service';
import { ExerciseCreateService } from './admin.components/exercise-create/exercise-create.service';
import { SportHandlingComponent } from './admin.components/sport-handling/sport-handling.component';
import { SportsListComponent } from './admin.components/sports-list/sports-list.component';
import { GoalListComponent } from './admin.components/goal-list/goal-list.component';
import { MeasureTypeComponent } from './admin.components/measure-type/measure-type.component';

@NgModule({
    imports: [
        ImportModule,
        CommonModule,
        FormsModule,
        AdminRoutingModule
    ],
    declarations: [
        AdminComponent,
        UserListComponent,
        ExerciseCreateComponent,
        ExerciseListComponent,
        ExerciseTypeComponent,
        AdminRootProfileComponent,
        SportHandlingComponent,
        SportsListComponent,
        GoalListComponent,
        MeasureListComponent,
        MeasureTypeComponent
    ],
    providers: [
        ToasterService,
        AdminRootProfileService,
        ExerciseCreateService
    ]
})
export class AdminModule {}
