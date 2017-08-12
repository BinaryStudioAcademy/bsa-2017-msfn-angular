import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ImportModule } from '../../import.module';
import { AdminComponent } from './admin.component';
<<<<<<< HEAD
=======
import { UserListComponent } from './admin.components/user-list/user-list.component';
import { ExerciseCreateComponent } from './admin.components/exercise-create/exercise-create.component';
import { ExerciseListComponent } from './admin.components/exercise-list/exercise-list.component';
import { ExerciseTypeComponent } from './admin.components/exercise-type/exercise-type.component';
// import { ListComponent } from '../../components/list/list.component';
// import { AutocompletePipe } from '../../components/list/autocomplete.pipe';
>>>>>>> 3a5e091fa25208132ce4718440a35890ef06164b

import { AdminRoutingModule } from './admin-routing.module';
import { AdminRootProfileComponent } from './admin.components/admin-root-profile/admin-root-profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    ImportModule
  ],
  declarations: [
    AdminComponent,
<<<<<<< HEAD
    AdminRootProfileComponent
=======
    // ListComponent,
    // AutocompletePipe,
    UserListComponent,
    ExerciseCreateComponent,
    ExerciseListComponent,
    ExerciseTypeComponent
>>>>>>> 3a5e091fa25208132ce4718440a35890ef06164b
  ],
  providers: []
})
export class AdminModule {}
