import { Component, OnInit } from '@angular/core';
import { WindowObj } from '../../../../services/window.service';
import { ProfileService } from '../../profile/profile.service';
import { ToasterService } from '../../../../services/toastr.service';
import { IUser } from '../../../../models/user';

@Component({
  selector: 'app-misc',
  templateUrl: './misc.component.html',
  styleUrls: ['./misc.component.scss'],
    providers: [
        ProfileService,
        ToasterService
    ]
})

export class MiscComponent implements OnInit {

    constructor(private profileService: ProfileService,
                private window: WindowObj,
                private toasterService: ToasterService) { }

    user: IUser;
    userId = (this.window.data._injectedData as any).userId;
    requestForCoaching = false;
    coachingMessage: string;


    applyForCoaching() {
        const userData = {
            requestForCoaching: true
        };
        this.requestForCoaching = true;

        this.profileService.coachStatusRequest(this.user._id, res => {
            if (res.requested) {
                this.toasterService.showMessage('success', null);
                this.coachingMessage = 'We\'ll moderate your request in 24 hours.' +
                    ' You\'ll get a notification when it would be done.';
            } else {
                this.toasterService.showMessage('error', null);
                this.coachingMessage = 'Request was unsuccessful. Please try again.';
            }
        });
    }

    ngOnInit() {
        this.profileService.getUser(this.userId, res => {
            this.user = res;
            this.requestForCoaching = this.user.requestForCoaching === true;
        });
    }

}
