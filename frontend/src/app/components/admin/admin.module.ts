import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ImportModule } from '../../import.module';
import { AdminComponent } from './admin.component';

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
    AdminRootProfileComponent
  ],
  providers: [ ]
})
export class AdminModule {}
