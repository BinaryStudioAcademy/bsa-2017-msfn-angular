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
    public loading = false;
    public ableToLoad = true;
    public countPerPage = 2;

    constructor(private httpHandler: HttpService) {
    }

    ngOnInit() {
        this.loadPlans();
    }

    loadPlans() {
        const request: IHttpReq = {
            url: `/api/training-plan/public/${this.countPerPage}/${this.plans.length}`,
            method: 'GET',
            body: {}
        };

        this.loading = true;

        this.httpHandler.sendRequest(request)
            .then((result) => {
                if (result.length === 0) {
                    this.ableToLoad = false;
                    return;
                }
                if (result.length < this.countPerPage) {
                    this.ableToLoad = false;
                }

                result.forEach(plan => {
                    if (this.users[plan.userID]) {
                        plan.user = this.users[plan.userID];
                        this.plans = this.plans.concat([plan]);
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
                                this.plans = this.plans.concat([plan]);
                            });
                    }
                });
                this.loading = false;
                console.log(this.plans);
            });
    }
}
