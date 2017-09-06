import { Component, OnInit } from '@angular/core';
import { WindowObj } from '../../../../services/window.service';
import { ProfileService } from '../profile/profile.service';
import { ToasterService } from '../../../../services/toastr.service';

@Component({
    selector: 'app-privacy',
    templateUrl: './privacy.component.html',
    styleUrls: ['./privacy.component.scss'],
    providers: [
        ProfileService,
        ToasterService
    ]
})

export class PrivacyComponent implements OnInit {
    privacy = {
        email: true,
        birthday: true,
        height: true,
        weight: true,
        following: true
    };
    userId = (this.window.data._injectedData as any).userId;

    constructor(
        private profileService: ProfileService,
        private window: WindowObj,
        private toasterService: ToasterService
    ) { }

    ngOnInit() {
        this.profileService.getUser(this.userId, res => {
            res.privacyHideFields.forEach(el => {
                this.privacy[el] = false;
            });
        });
    }

    saveSettings() {
        const privacyHideFields = [];
        for (const key in this.privacy) {
            if (this.privacy.hasOwnProperty(key)) {
                if (this.privacy[key] === false) {
                    privacyHideFields.push(key);
                }
            }
        }

        this.profileService.updateUser({privacyHideFields: privacyHideFields}, this.userId, res => {
            console.log(res);
        });
    }

}
