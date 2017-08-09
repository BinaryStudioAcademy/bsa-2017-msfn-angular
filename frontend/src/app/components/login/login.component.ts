import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EncryptService } from '../../services/encrypt.service';
import { IHttpReq } from '../../models/http-req';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  email: string;
  password: string;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.EMAIL_REGEX)
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  constructor(
    private encryptor: EncryptService,
    private httpHandler: HttpService,
    private router: Router
  ) { }

  login() {
    const encData = this.encryptor.encrypt({
      'password': this.password,
      'email': this.email
    }),
      sendData: IHttpReq = {
        url: '/api/login',
        method: 'POST',
        body: {data: encData}
      }

    this.httpHandler.sendRequest(sendData)
      .then((res) => {
        if (res.access) {
          this.router.navigate(['/profile'])
        }
      })
  }
}
