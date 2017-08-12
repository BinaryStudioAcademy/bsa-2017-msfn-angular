import { LoginDialogComponent } from './../login-dialog/login-dialog.component';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { WindowObj } from '../../services/window.service';

@Component({
    selector: 'app-index-page',
    templateUrl: './index-page.component.html',
    styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit, OnDestroy {

    public isLoggedIn: boolean;
    private openedDialog: MdDialogRef<any> | null;

    constructor(public window: WindowObj,
                private dialog: MdDialog) {
        this.isLoggedIn = window.data._injectedData.isLoggedIn;
        this.openedDialog = null;
    }

    ngOnInit() {
    }

    showLogin() {
        this.openedDialog = this.dialog.open(LoginDialogComponent);
    }

    ngOnDestroy() {
        this.openedDialog.close();
    }
}
