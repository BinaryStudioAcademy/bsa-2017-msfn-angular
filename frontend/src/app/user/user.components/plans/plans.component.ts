import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {HttpService} from '../../../services/http.service';
import {IHttpReq} from '../../../models/http-req';
import {EncryptService} from '../../../services/encrypt.service';

@Component({
    selector: 'app-plans',
    templateUrl: './plans.component.html',
    styleUrls: ['./plans.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlansComponent implements OnInit {

    private tabs = {
        0: 'all',
        1: 'follow'
    };
    public selectedTab = 0;
    public plans: any[] = [];
    public users: any[] = [];
    public plansToShow: any[] = [];
    public loading = false;
    public ableToLoad = true;
    public countPerPage = 12;
    private filter = {
        'filter': {},
        'limit': this.countPerPage,
        'offset': this.plans.length
    };
    private searchTimeout = 0;
    private lastSearch = '';

    constructor(private httpHandler: HttpService,
                private encryptService: EncryptService) {
    }

    ngOnInit() {
        this.loadPlans();
    }

    changeSort(e) {
        const tab = this.tabs[this.selectedTab];

        this.plans = [];
        this.ableToLoad = true;

        switch (tab) {
            case 'follow':
                const followersRequest: IHttpReq = {
                    url: '/api/user/subscribe/following',
                    method: 'GET'
                };
                this.loading = true;
                this.httpHandler.sendRequest(followersRequest)
                    .then(
                        (followingUsers) => {
                            const followingUsersId = followingUsers.map(user => {
                                return user._id;
                            });
                            (<any>this.filter.filter).userID = {
                                '$in': followingUsersId
                            };

                            this.loadPlans();
                        }
                    );
                break;
            case 'all':
                (<any>this.filter.filter).userID = null;
                delete (<any>this.filter.filter).userID;
                this.loadPlans();
                break;
        }
    }

    setSearch(search) {
        if (search === this.lastSearch) {
            return;
        }
        this.loading = true;
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            this.executeSearch(search);
        }, 1500);
    }

    executeSearch(search) {
        if (this.lastSearch === search) {
            return;
        }
        this.lastSearch = search;
        (<any>this.filter.filter).search = search;

        clearTimeout(this.searchTimeout);

        this.plans = [];
        this.ableToLoad = true;
        if (!search) {
            (<any>this.filter.filter).search = null;
            delete (<any>this.filter.filter).search;
            this.loadPlans();
        } else {
            this.searchPlans(search);
        }
    }

    searchPlans(search) {
        const request: IHttpReq = {
            url: `/api/training-plan/search/${encodeURIComponent(this.encryptService.encrypt(this.filter.filter))}`,
            method: 'GET'
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
            }).then(() => {
            console.log(this);
            this.loading = false;
        });
    }

    loadPlans() {
        if ((<any>this.filter.filter).search && this.lastSearch !== '') {
            this.searchPlans(this.lastSearch);
            return;
        }
        this.filter.offset = this.plans.length;
        const request: IHttpReq = {
            url: `/api/training-plan/public/${encodeURIComponent(this.encryptService.encrypt(this.filter))}`,
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
            }).then(() => {
            console.log(this);
            this.loading = false;
        });
    }
}
