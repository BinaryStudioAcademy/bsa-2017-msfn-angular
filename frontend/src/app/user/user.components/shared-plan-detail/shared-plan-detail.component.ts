import {Component, OnInit} from '@angular/core';
import {IHttpReq} from '../../../models/http-req';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../../services/http.service';
import {MdDialog} from '@angular/material';
import {EncryptService} from '../../../services/encrypt.service';
import {GCalendarService} from '../../../services/gcalendar.service';
import {WindowObj} from '../../../services/window.service';

@Component({
    selector: 'app-shared-plan-detail',
    templateUrl: './shared-plan-detail.component.html',
    styleUrls: ['./shared-plan-detail.component.scss']
})
export class SharedPlanDetailComponent implements OnInit {

    public user: any;
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
                private window: WindowObj,
                private activatedRoute: ActivatedRoute,
                private encryptService: EncryptService,
                private gcalendar: GCalendarService,
                private router: Router) {
    }

    ngOnInit() {
        this.user = this.window.data._injectedData;

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

                        this.trainingPlan.gcalendar_id = null;
                        this.trainingPlan._id = null;
                        this.trainingPlan.shared = false;

                        const userRequest: IHttpReq = {
                            url: '/api/user/' + this.trainingPlan.userID,
                            method: 'GET'
                        };

                        this.httpHandler.sendRequest(userRequest)
                            .then(user => {
                                this.trainingPlan.user = user;
                            });

                        this.trainingPlan.days.forEach(
                            item => {
                                this.days.forEach(
                                    day => {
                                        if (day.key === item.key && item.checked) {
                                            day.checked = item.checked;
                                        }
                                    }
                                );
                            }
                        );

                        console.log(this.trainingPlan);
                    }
                });
        }
    }

    savePlan() {
        const sendData: IHttpReq = {
            url: `/api/training-plan`,
            method: 'POST',
            body: this.trainingPlan,
            successMessage: 'Plan created',
        };

        sendData.body.additional = {
            author: (<any>this.trainingPlan.user)._id,
            date: Date.now()
        };

        if (this.gcalendar.authorized) {
            let recurrence = 'RRULE:FREQ=WEEKLY;';
            const newCalendarEvent = {
                recurrence: [],
                summary: this.trainingPlan.name,
                description: 'Today training plan - ' + this.trainingPlan.name,
                reminders: {
                    useDefault: true
                },
                start: this.gcalendar.makeFullDate(new Date()),
                end: this.gcalendar.makeFullDate(new Date(Date.now() + 1000 * 60 * 60)),
                source: 'MFSN'
            };
            let dayHeadingAdded = false;
            this.trainingPlan.days.forEach((item, key) => {
                if (!dayHeadingAdded) {
                    recurrence += 'BYDAY=';
                    dayHeadingAdded = true;
                }
                if (item.checked && item.code) {
                    recurrence += item.code;
                    if (this.trainingPlan.days[key + 1]) {
                        recurrence += ',';
                    }
                }
            });
            newCalendarEvent.recurrence.push(recurrence);

            let action = '';

            if (this.trainingPlan.gcalendar_id) {
                this.gcalendar.getEvent(this.trainingPlan.gcalendar_id, (error, event) => {
                    if (error && error === 'Not found') {
                        action = 'add';
                    }
                    if (!action && error) {
                        action = '';
                    }
                    if (!action && event.result.status === 'cancelled') {
                        action = 'add';
                    }
                    if (!action) {
                        action = 'update';
                    }

                    switch (action) {
                        case 'add':
                            this.gcalendar.addEvent(newCalendarEvent, (err, result) => {
                                if (err) {
                                    console.error(err);
                                    return;
                                }
                                this.trainingPlan.gcalendar_id = result.result.id;
                                sendData.body = this.trainingPlan;
                                this.httpHandler.sendRequest(sendData)
                                    .then((res) => {
                                        if (res) {
                                            if (!res.nModified) {
                                                this.trainingPlan._id = res._id;
                                            }
                                        }
                                    });
                            });
                            break;
                        case 'update':
                            this.gcalendar.updateEvent(this.trainingPlan.gcalendar_id, newCalendarEvent, (err, result) => {
                                if (err) {
                                    console.error(err);
                                    return;
                                }
                                this.trainingPlan.gcalendar_id = result.result.id;
                                sendData.body = this.trainingPlan;
                                this.httpHandler.sendRequest(sendData)
                                    .then((res) => {
                                        if (res) {
                                            if (!res.nModified) {
                                                this.trainingPlan._id = res._id;
                                            }
                                        }
                                    });
                            });
                            break;
                    }
                });

            } else {
                this.gcalendar.addEvent(newCalendarEvent, (err, result) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    this.trainingPlan.gcalendar_id = result.result.id;
                    sendData.body = this.trainingPlan;
                    this.httpHandler.sendRequest(sendData)
                        .then((res) => {
                            if (res) {
                                if (!res.nModified) {
                                    this.router.navigate(['/user/training-plan/' + res._id]);
                                }
                            }
                        });
                });
            }
        } else {
            console.log('NO GOOGLE AUTH');
            this.httpHandler.sendRequest(sendData)
                .then((res) => {
                    if (res) {
                        if (!res.nModified) {
                            this.router.navigate(['/user/training-plan/' + res._id]);
                        }
                    }
                });
        }
    }
}
