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
    private subscription: Subscription;
    private id: number;
    public status: string;
    public role: string;
    public fName: string;
    public lName: string;
    public email: string[];
    public height: number | string;
    public weight: number | string;
    public age: number | string;
    public gender: string;
    private ISOtoAge(iso: string): number {
        return Math.floor(Date.now() - Date.parse(iso));
    }


    constructor(
        private activateRoute: ActivatedRoute,
        private adminRootProfileService: AdminRootProfileService
    ) {
        this.subscription = activateRoute.params.subscribe(params => this.id = params['id']);
    }

    ngOnInit() {
        this.adminRootProfileService.getProfile(this.id, (user) => {
            console.log(user);
            // here we can add status when begin use socket.io
            this.status = 'offline';
            this.role = (user.isAdmin) ? 'admin' : (user.isCoach) ? 'coach' : 'usual';
            this.fName = (user.firstName) ? user.firstName : 'unknown';
            this.lName = (user.lastName) ? user.lastName : 'unknown';
            this.email = (user.email) ? (user.email.forEach) ? user.email : [user.email] : 'unknown';
            this.height = (user.height) ? user.height : 'unknown';
            this.weight = (user.weight) ? user.weight : 'unknown';
            this.gender = (user.gender) ? user.gender : 'unknown';
            // here need paste name of date field from DB
            this.age = (user.date) ? this.ISOtoAge(user.date) : 'unknown';
            return true;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
