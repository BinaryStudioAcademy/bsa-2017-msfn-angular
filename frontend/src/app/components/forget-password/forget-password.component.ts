import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  email: string;

  constructor() { }

  ngOnInit() {
  }
  

  sendLetter(form: NgForm) {
    if (form.valid) {
      console.log("OK " + this.email);
      // send message()
    }
    else{
      console.log("ER " + this.email);
    }
  }

}
