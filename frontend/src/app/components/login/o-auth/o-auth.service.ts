import {Injectable} from '@angular/core';

declare let gapi: any;

@Injectable()
export class OAuthService {
    googleLoginButtonId = 'g-signin2';

    constructor() {
    }

    renderGoogleLoginButton() {
        gapi.signin2.render(
            this.googleLoginButtonId,
            {
                'onSuccess': this.onGoogleLoginSuccess,
                'width': 240,
                'height': 50,
                'longtitle': true,
                'theme': 'dark',
            });
        console.log(window);
    }

    onGoogleLoginSuccess(googleUser) {
        console.log('log in success!');

        const profile = googleUser.getBasicProfile();
        console.log(profile);
        console.log('ID: ' + profile.getId());
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        ///for backend
        const id_token = googleUser.getAuthResponse().id_token;
        console.log(id_token);
    }
}
