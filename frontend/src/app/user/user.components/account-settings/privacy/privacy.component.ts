import { Component, OnInit } from '@angular/core';
import { WindowObj } from '../../../../services/window.service';
import { ProfileService } from '../../profile/profile.service';
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

    constructor(
        private profileService: ProfileService,
        private window: WindowObj,
        private toasterService: ToasterService
    ) { }

    ngOnInit() { }

    saveSettings() {

    }

}
