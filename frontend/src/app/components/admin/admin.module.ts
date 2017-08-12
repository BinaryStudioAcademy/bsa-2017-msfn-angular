import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ImportModule } from '../../import.module';
import { AdminComponent } from './admin.component';
import { UserListComponent } from './admin.components/user-list/user-list.component';
import { ExerciseCreateComponent } from './admin.components/exercise-create/exercise-create.component';
import { ExerciseListComponent } from './admin.components/exercise-list/exercise-list.component';
import { ExerciseTypeComponent } from './admin.components/exercise-type/exercise-type.component';

import { AdminRoutingModule } from './admin-routing.module';
import {ToasterService} from '../../services/toastr.service';

@NgModule({
  imports: [
    ImportModule,
    CommonModule,
    // BrowserModule,
    FormsModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminComponent,
    UserListComponent,
    ExerciseCreateComponent,
    ExerciseListComponent,
    ExerciseTypeComponent
  ],
  providers: [ToasterService]
})
export class AdminModule {}
