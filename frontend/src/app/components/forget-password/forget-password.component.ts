import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IHttpReq } from '../../models/http-req';
import { HttpService } from '../../services/http.service';
import {ToasterService} from '../../services/toastr.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  email: string;

  constructor(
    private httpHandler: HttpService,
    private toastrService: ToasterService
  ) { }

  ngOnInit() {}

  sendLetter(form: NgForm) {
    if (form.valid) {
      const sendData: IHttpReq = {
        url: '/api/password',
        method: 'POST',
        body: {email: this.email}
      };

    this.httpHandler.sendRequest(sendData)
      .then((res) => {
        if (res.access) {
          this.toastrService.showMessage('success', 'Check your email');
        }
      });
      // send message()
    } else {
      console.log('ER ' + this.email);
    }
  }

}
