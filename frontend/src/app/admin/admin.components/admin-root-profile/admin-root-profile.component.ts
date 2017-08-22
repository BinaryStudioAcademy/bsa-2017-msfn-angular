import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminRootProfileService } from './admin-root-profile.service';
import { Subscription } from 'rxjs/Subscription';
import { HttpService } from '../../../services/http.service';
import { ToasterService } from '../../../services/toastr.service';
import { AdminService } from '../../services/admin.service';

@Component({
    selector: 'app-admin-root-profile',
    templateUrl: './admin-root-profile.component.html',
    styleUrls: ['./admin-root-profile.component.scss'],
    providers: [AdminService]
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
    public requestForCoaching: boolean;

    constructor(
        private activateRoute: ActivatedRoute,
        private adminService: AdminService,
        private adminRootProfileService: AdminRootProfileService,
        private toasterService: ToasterService
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
            this.requestForCoaching = (user.requestForCoaching) ? user.requestForCoaching : false;
            // here need paste name of date field from DB
            this.age = (user.birthday) ? this.adminRootProfileService.getAge(user.birthday) : 'unknown';
            return true;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    acceptCoachRequest() {
        const userData = {
            isCoach: true
        };
        this.sendUserData('coach', userData);
    }

    rejectCoachRequest() {
        this.sendUserData('usual');
    }

    sendUserData(role, data?) {
        this.adminService.processCoachRequest(this.id, data, res => {
            if (typeof(res) === 'object') {
                this.toasterService.showMessage('success', null);
                this.requestForCoaching = false;
                this.role = role;
            } else {
                this.toasterService.showMessage('error', null);
            }
        });
    }
}
