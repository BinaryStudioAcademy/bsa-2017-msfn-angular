import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit {

newPass: string;
repeatPass: string;
passwordMatched: boolean;


  constructor() { }

  ngOnInit() {
    this.passwordMatched = false;
  }

  changePassword(form: NgForm) {
    this.passwordMatched = this.newPass === this.repeatPass;
    if (form.valid && this.passwordMatched) {
      console.log('OK ' + this.newPass);
      // send message()
    } else {
      console.log('ER');
    }
  }

}
