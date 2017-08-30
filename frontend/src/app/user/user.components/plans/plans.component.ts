import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {IHttpReq} from '../../../models/http-req';

@Component({
    selector: 'app-plans',
    templateUrl: './plans.component.html',
    styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {

    public plans: any[] = [];
    public users: any[] = [];
    public plansToShow: any[] = [];

    constructor(private httpHandler: HttpService) {
    }

    ngOnInit() {
        this.loadPlans();
    }

    loadPlans() {
        const offset = this.plans.length;

        const request: IHttpReq = {
            url: '/api/training-plan/public/' + offset,
            method: 'GET',
            body: {}
        };

        this.httpHandler.sendRequest(request)
            .then((result) => {
                this.plans = this.plans.concat(result);

                this.plans.forEach(plan => {
                    if (this.users[plan.userID]) {
                        plan.user = this.users[plan.userID];
                    } else {
                        const userRequest: IHttpReq = {
                            url: '/api/user/' + plan.userID,
                            method: 'GET',
                            body: {}
                        };

                        this.httpHandler.sendRequest(userRequest)
                            .then((user) => {
                                plan.user = user;
                                this.users[plan.userID] = user;
                            });
                    }
                });
                console.log(this.plans);
            });
    }
}
