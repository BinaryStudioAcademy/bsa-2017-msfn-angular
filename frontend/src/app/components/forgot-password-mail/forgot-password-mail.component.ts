import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password-mail',
  templateUrl: './forgot-password-mail.component.html',
  styleUrls: ['./forgot-password-mail.component.scss']
})
export class ForgotPasswordMailComponent implements OnInit {
  message = 'You\'re receiving this email because you requested a password reset for your user account at MSFN.';
  continueMessage = 'To continue, take this code, go to the following page and set a new password:';
  abortMessage = 'In case you didn\'t request password reset just ignore this mail';
  code = 'CODESAMPLE';
  link = '/restore-password';
  signature = 'The MSFN team';

  constructor() { }

  ngOnInit() {
  }

}
