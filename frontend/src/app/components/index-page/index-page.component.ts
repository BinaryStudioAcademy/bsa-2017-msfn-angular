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
    private closeRegNeedsConfirm = false;

    constructor(public window: WindowObj,
        private dialog: MdDialog,
        private router: Router
    ) {
        this.isLoggedIn = window.data._injectedData.isLoggedIn;
        this.openedDialog = null;

        // Prevent registration dialog close, if user did put some values in it
        MdDialogRef.prototype.close = function (dialogResult) {
            const instance = this.componentInstance;
            // Check if closing dialog is the Registration dialog
            if (instance.registrationService && instance.requestSent === false) {

                if (instance.emailFormControl.dirty ||
                    instance.firstNameFormControl.dirty ||
                    instance.lastNameFormControl.dirty ||
                    instance.heightFormControl.dirty ||
                    instance.weightFormControl.dirty) {
                    this.closeRegNeedsConfirm = true;
                }
                if (this.closeRegNeedsConfirm === true) {
                    this.closeRegNeedsConfirm = confirm('Close registration dialog?');

                    if (this.closeRegNeedsConfirm === true) {
                        this._result = dialogResult; // Standart Angular behavior
                        this._containerInstance._state = 'exit'; // Standart Angular behavior
                        this._overlayRef.detachBackdrop(); // Transition the backdrop in parallel with the dialog. Standart Angular behavior
                    } else {
                        return false;
                    }
                } else {
                    this._result = dialogResult; // Standart Angular behavior
                    this._containerInstance._state = 'exit'; // Standart Angular behavior
                    this._overlayRef.detachBackdrop(); // Transition the backdrop in parallel with the dialog. Standart Angular behavior
                }
            } else {
                this._result = dialogResult; // Standart Angular behavior
                this._containerInstance._state = 'exit'; // Standart Angular behavior
                this._overlayRef.detachBackdrop(); // Transition the backdrop in parallel with the dialog. Standart Angular behavior
            }
        };
    }

    ngOnInit() {
        if (this.window.data._injectedData.isLoggedIn) {
            if (this.window.data._injectedData.role === 'admin') {
                this.router.navigate(['/admin']);
            } else {
                this.router.navigate(['/user']);
            }
        }
    }

    showLogin() {
        this.openedDialog = this.dialog.open(LoginDialogComponent);
    }

    showRegistration() {
        this.openedDialog = this.dialog.open(RegistrationComponent, { height: 'auto' });
    }

    ngOnDestroy() {
        if (this.openedDialog) {
            this.openedDialog.close();
        }
    }
}
