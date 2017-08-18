import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OtherProfilesService } from './other-profiles.service';
import { IUser } from '../../../models/user';

@Component({
    selector: 'app-profile',
    templateUrl: './other-profiles.component.html',
    styleUrls: ['./other-profiles.component.scss'],
    providers: [
        OtherProfilesService
    ]
})
export class OtherProfilesComponent implements OnInit {
    user: IUser;

    constructor(
        private otherProfilesService: OtherProfilesService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.otherProfilesService.getUser(id, (user: IUser) => {
            this.user = user;
        });
    }
}
