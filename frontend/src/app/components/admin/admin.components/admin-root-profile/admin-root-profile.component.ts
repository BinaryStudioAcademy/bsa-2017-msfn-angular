import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminRootProfileService } from './admin-root-profile.service';
import { Subscription } from 'rxjs/Subscription';
import { HttpService } from '../../../../services/http.service';

@Component({
    selector: 'app-admin-root-profile',
    templateUrl: './admin-root-profile.component.html',
    styleUrls: ['./admin-root-profile.component.scss']
})
export class AdminRootProfileComponent implements OnDestroy, OnInit {
    private id: number;
    private subscription: Subscription;

    constructor(private activateRoute: ActivatedRoute, private adminRootProfileService: AdminRootProfileService) {
        this.subscription = activateRoute.params.subscribe(params => this.id = params['id']);
    }

    ngOnInit() {
        console.log('init');
        this.adminRootProfileService.getProfile((user) => {
            console.log(user);
            return true;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
