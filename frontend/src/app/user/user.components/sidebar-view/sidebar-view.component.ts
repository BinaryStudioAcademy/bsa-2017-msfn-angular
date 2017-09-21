import { Component, OnInit } from '@angular/core';
import {MdDialog} from '@angular/material';
import { WindowObj } from '../../../services/window.service';
import { LogoutDialogComponent } from '../../../components/logout-dialog/logout-dialog.component';

@Component({
    selector: 'app-sidebar-view',
    templateUrl: './sidebar-view.component.html',
    styleUrls: ['./sidebar-view.component.scss']
})
export class SidebarViewComponent implements OnInit {
    public userPhotoUrl = (this.window.data._injectedData as any).userPhoto || './resources/default.png';
    constructor(
        public window: WindowObj,
        public dialog: MdDialog,
    ) {}

    ngOnInit() {}

    logout() {
        this.dialog.open(LogoutDialogComponent, {});
    }
}
