import { LoginDialogComponent } from './../login-dialog/login-dialog.component';
import { RegistrationComponent } from './../registration/registration.component';
import { MdDialog, MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';
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
        private dialog: MdDialog,
        private router: Router
            ) {
        this.isLoggedIn = window.data._injectedData.isLoggedIn;
        this.openedDialog = null;
    }

    ngOnInit() {
        if (this.window.data._injectedData.isLoggedIn) {
        if (this.window.data._injectedData.role === 'admin') {
            this.router.navigate(['/admin']);
        } else {
            this.router.navigate(['/user/profile']);
        }
        }
    }

    showLogin() {
        this.openedDialog = this.dialog.open(LoginDialogComponent);
    }

    showRegistration() {
        this.openedDialog = this.dialog.open(RegistrationComponent, {height: 'auto'});
    }

    ngOnDestroy() {
        if (this.openedDialog) {
            this.openedDialog.close();
        }
    }
}
