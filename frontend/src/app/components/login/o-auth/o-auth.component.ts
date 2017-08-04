import {Component, OnInit} from '@angular/core';
import {OAuthService} from './o-auth.service';

@Component({
    selector: 'app-o-auth',
    providers: [OAuthService],
    templateUrl: './o-auth.component.html',
    styleUrls: ['./o-auth.component.scss']
})

export class OAuthComponent implements OnInit {

    constructor(private oAuthService: OAuthService) {
    }

    ngOnInit() {
        this.renderButtons();
    }

    public renderButtons() {
        this.oAuthService.renderGoogleLoginButton();
        this.oAuthService.renderFacebookLoginButton();
    }
}
