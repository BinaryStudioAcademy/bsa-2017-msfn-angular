import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ImportModule } from '../../import.module';
import { AdminComponent } from './admin.component';
import { Test1Component } from './admin.components/test1/test1.component';
import { Test2Component } from './admin.components/test2/test2.component';

import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    ImportModule
  ],
  declarations: [
    AdminComponent,
    Test1Component,
    Test2Component
  ],
  providers: [ ]
})
export class AdminModule {}
