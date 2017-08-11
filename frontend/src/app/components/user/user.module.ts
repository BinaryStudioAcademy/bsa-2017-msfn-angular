import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';
import { ImportModule } from '../../import.module';
import { UserComponent } from './user.component';
import { SidebarViewComponent } from '../sidebar-view/sidebar-view.component';
import { ProfileComponent } from './user.components/profile/profile.component';

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
    ]
})
export class UserModule {}
