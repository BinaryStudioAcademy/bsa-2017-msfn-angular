import {Component, OnInit} from '@angular/core';
import {IHttpReq} from '../../../models/http-req';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../../../services/http.service';
import {MdDialog} from '@angular/material';
import {EncryptService} from '../../../services/encrypt.service';

@Component({
    selector: 'app-shared-plan-detail',
    templateUrl: './shared-plan-detail.component.html',
    styleUrls: ['./shared-plan-detail.component.scss']
})
export class SharedPlanDetailComponent implements OnInit {

    public userMeasures: any;
    public trainingPlan = {
        _id: '',
        name: '',
        days: [],
        count: 0,
        trainingType: '',
        exercisesList: [],
        intervals: [],
        gcalendar_id: '',
        shared: false,
        userID: '',
        user: { }
    };
    public types = [
        {
            key: 'general',
            value: 'General training',
            checked: false
        },
        {
            key: 'interval',
            value: 'Interval training',
            checked: false
        },
    ];
    public days = [
        { 'key': '1', 'value': 'Mon', 'checked': false, code: 'MO' },
        { 'key': '2', 'value': 'Tue', 'checked': false, code: 'TU' },
        { 'key': '3', 'value': 'Wed', 'checked': false, code: 'WE' },
        { 'key': '4', 'value': 'Thu', 'checked': false, code: 'TH' },
        { 'key': '5', 'value': 'Fri', 'checked': false, code: 'FR' },
        { 'key': '6', 'value': 'Sat', 'checked': false, code: 'SA' },
        { 'key': '0', 'value': 'Sun', 'checked': false, code: 'SU' }
    ];

    constructor(private dialog: MdDialog,
                private httpHandler: HttpService,
                public activatedRoute: ActivatedRoute,
                private encryptService: EncryptService) {
    }

    ngOnInit() {
        const sdata: IHttpReq = {
            url: '/api/user/me',
            method: 'GET',
            body: {},
        };
        this.httpHandler.sendRequest(sdata).then(data => {
            this.userMeasures = data.settings;
        });

        if (this.activatedRoute.snapshot.params.id) {
            const planID = this.activatedRoute.snapshot.params.id;
            const sendData: IHttpReq = {
                url: `/api/training-plan/public/${encodeURIComponent(this.encryptService.encrypt({filter: {_id: planID}}))}`,
                method: 'GET',
                body: '',
            };

            this.httpHandler.sendRequest(sendData)
                .then((res) => {
                    if (res) {
                        this.trainingPlan = res.shift();

                        const userRequest: IHttpReq = {
                            url: '/api/user/' + this.trainingPlan.userID,
                            method: 'GET'
                        };

                        this.httpHandler.sendRequest(userRequest)
                            .then(user => {
                                this.trainingPlan.user = user;
                            });
                    }

                    console.log(this.trainingPlan);
                });
        }
    }

}
