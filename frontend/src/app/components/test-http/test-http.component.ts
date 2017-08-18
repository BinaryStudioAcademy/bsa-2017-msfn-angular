import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { IHttpReq } from '../../models/http-req';

@Component({
    selector: 'app-test-http',
    templateUrl: './test-http.component.html',
    styleUrls: ['./test-http.component.scss']
})
export class TestHttpComponent implements OnInit {

    public info: any;

    getReq: IHttpReq = {
        url: '/api/user',
        method: 'GET',
        body: {},
        failMessage: 'Failed to get all of them :(',
        successMessage: 'Yay! Here is what you asked for!'
    };

    // To change url, for some created Mongo id
    getReqOne: IHttpReq = {
        url: '/api/user/5986810b98fdb71ab46086ff',
        method: 'GET',
        body: {},
        failMessage: 'Failed to get all of them :(',
        successMessage: 'Yay! Here is what you asked for!'
    };

    getReqNoMessages: IHttpReq = {
        url: '/api/user',
        method: 'GET',
        body: {}
    };

    // Get error in response, because of wrong url
    getReqErr: IHttpReq = {
        url: '/api/unknownroute',
        method: 'GET',
        body: {},
        failMessage: 'Failed to get all of them :(',
        successMessage: 'Yay! Here is what you asked for!'
    };

    postReq: IHttpReq = {
        url: '/api/user',
        method: 'POST',
        body: {
            name: 'Verytesti',
            email: 'helloamigos@muchachos.com',
            password: 'qwerty'
        },
        failMessage: 'Failed to create a new one :(',
        successMessage: 'Hoorah! New one created'
    };

    postReq2: IHttpReq = {
        url: '/api/user',
        method: 'POST',
        body: {
            name: 'Kurvo',
            email: 'pshe@pshe.pl',
            password: 'qwerty'
        },
        failMessage: 'Failed to create a new one :(',
        successMessage: 'Hoorah! New one created'
    };

    // To change url, for some created Mongo id
    putReq: IHttpReq = {
        url: '/api/user/59870b81d7e97922784f1356',
        method: 'PUT',
        body: {
            email: 'dus@higg.com',
            firstName: 'Lapi',
            password: 'qwerty'
        },
        failMessage: 'Failed to change info about one :(',
        successMessage: 'Gratz, new info is saved'
    };

    // To change url, for some created Mongo id
    putReq2: IHttpReq = {
        url: '/api/user/2',
        method: 'PUT',
        body: {
            email: 'changed@email.com',
            firstName: 'user2',
            password: 'qwerty'
        },
        failMessage: 'Failed to change info about one :(',
        successMessage: 'Gratz, new info is saved'
    };

    // To change url, for some created Mongo id
    deleteReq: IHttpReq = {
        url: '/api/user/59870b81d7e97922784f1356',
        method: 'DELETE',
        body: {},
        failMessage: 'Failed to delete :(',
        successMessage: 'Instance was deleted'
    };


    getFollowingReq: IHttpReq = {
        url: '/api/user/subscribe/following',
        method: 'GET',
        body: {},
        failMessage: 'Fail',
        successMessage: 'go to console!'
    };
    getFollowersReq: IHttpReq = {
        url: '/api/user/subscribe/followers',
        method: 'GET',
        body: {},
        failMessage: 'Fail',
        successMessage: 'go to console!'
    };

    constructor(private httpService: HttpService) {
    }

    ngOnInit() {
    }

    // This follows how to actually use MAIN METHOD in HTTP SERVICE
    sendHttp(request: IHttpReq) {
        this.httpService.sendRequest(request).then(data => {
            this.info = data;
            console.log(this.info);
        });
    }

    subscribe(id: string) {
        const subscribeReq: IHttpReq = {
            url: '/api/user/subscribe/follow',
            method: 'POST',
            body: {
                'user_id': id
            },
            failMessage: 'Failed to sbskr',
            successMessage: 'subscribe!'
        };
        this.sendHttp(subscribeReq);
    }

}
