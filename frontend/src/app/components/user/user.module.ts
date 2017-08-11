import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {UserRoutingModule} from './user-routing.module';
import {ImportModule} from '../../import.module';
import {UserComponent} from './user.component';
import {TestU1Component} from './user.components/test-u1/test-u1.component';
import {TestU2Component} from './user.components/test-u2/test-u2.component';
import {SidebarViewComponent} from '../sidebar-view/sidebar-view.component';

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
        TestU1Component,
        TestU2Component,
    ]
})
export class UserModule {}
