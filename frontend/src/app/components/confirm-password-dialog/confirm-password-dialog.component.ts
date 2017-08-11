import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-confirm-password-dialog',
  templateUrl: './confirm-password-dialog.component.html',
  styleUrls: ['./confirm-password-dialog.component.scss'],
})
export class ConfirmPasswordDialogComponent implements OnInit {
  passwordForm: FormGroup;
  updatedPassword;
  isDisabled = true;
  changePassword = false;

  currentPasswordFormControl = new FormControl('',
    [
      Validators.required
    ]
  );

  user = {
    password: '123456',
  };

  constructor() { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.passwordForm = new FormGroup({
      newPassword: new FormControl({ value: '', disabled: this.isDisabled }, [Validators.minLength(6), Validators.required]),
      newPasswordConfirmation: new FormControl({ value: '', disabled: this.isDisabled }, [Validators.minLength(6), Validators.required]),
    }, this.passwordMatchValidator);
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword').value === g.get('newPasswordConfirmation').value
      ? null : {
        passwordMatchValidator: {
          'mismatch': true
        }
      };
  }
  onClick(controls) {
    this.updatedPassword = controls.newPassword;
  }


  onEnterPasword() {
    if (this.user.password === this.currentPasswordFormControl.value) {
      this.changePassword = true;
      this.isDisabled = false;
      this.currentPasswordFormControl.disable();
      this.buildForm();
    }
  }
}
