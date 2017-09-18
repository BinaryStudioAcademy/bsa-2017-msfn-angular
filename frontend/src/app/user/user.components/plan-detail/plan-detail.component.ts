import {Component, OnInit} from '@angular/core';
import {ExerciseEditDialogComponent} from './../exercise-edit-dialog/exercise-edit-dialog.component';
import {IntervalTrainingPlanComponent} from './../interval-training-plan/interval-training-plan.component';
import {MdDialog, MdDialogRef} from '@angular/material';
import {IHttpReq} from './../../../models/http-req';
import {HttpService} from '../../../services/http.service';
import {ActivatedRoute} from '@angular/router';
import {ExercisesComponent} from './../exercises/exercises.component';
import {GCalendarService} from '../../../services/gcalendar.service';


@Component({
    selector: 'app-plan-detail',
    templateUrl: './plan-detail.component.html',
    styleUrls: ['./plan-detail.component.scss']
})

export class PlanDetailComponent implements OnInit {
    title = 'Training plan create';
    trainingsCount = 0;
    exercisesList = [];

    days = [
        {'key': '1', 'checked': false},
        {'key': '2', 'checked': false},
        {'key': '3', 'checked': false},
        {'key': '4', 'checked': false},
        {'key': '5', 'checked': false},
        {'key': '6', 'checked': false},
        {'key': '0', 'checked': false}
    ];

    weekDayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // sportTypeValue doesn't use.. ?
    sportTypeValue: string;
    searchString: string = 'Coming soon...';

    types = [
        {
            key: 'general',
            value: 'General',
            checked: false
        },
        {
            key: 'interval',
            value: 'Interval',
            checked: false
        },
    ];
    userMeasures: any;
    displayExercises: Object[];
    errors = {
        emptyIntervals: null,
        emptyName: null,
        emptyExList: null
    };

    lastAfterClosedResult: string;

    trainingPlan = {
        _id: '',
        name: '',
        days: [],
        count: 0,
        trainingType: 'interval',
        exercisesList: [],
        intervals: [],
        gcalendar_id: '',
        description: '',
        shared: false
    };


    constructor(private gcalendar: GCalendarService,
                private dialog: MdDialog,
                private httpHandler: HttpService,
                public activatedRoute: ActivatedRoute) {
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
                url: `/api/training-plan/` + planID,
                method: 'GET',
                body: '',
            };

            this.httpHandler.sendRequest(sendData)
                .then((res) => {
                    if (res) {
                        this.trainingPlan = res[0];
                        this.trainingPlan.days.forEach((el) => {
                            this.days.forEach((day) => {
                                if (day.key === el.key) {
                                    day.checked = true;
                                }
                            });
                        });
                        this.types.forEach((type) => {
                            if (type.key === this.trainingPlan.trainingType) {
                                type.checked = true;
                            }
                        });

                        console.log(this.trainingPlan);
                    }
                });
        }
    }

    onChangeList(updatedList) {
        this.trainingPlan.exercisesList = updatedList;
        this.errors.emptyExList = false;
    }

    intervalAction(action, callback) {
        if (action.type === 'save') {
            if (this.trainingPlan.exercisesList.length) {
                const data = action.data;
                data.exList = this.trainingPlan.exercisesList;
                this.trainingPlan.intervals[action.cacheIndex] = data;
                this.errors.emptyIntervals = false;
                this.errors.emptyExList = false;
                this.trainingPlan.exercisesList = [];
            } else {
                this.errors.emptyExList = true;
            }
        } else if (action.type === 'delete') {
            this.trainingPlan.intervals.splice(action.cacheIndex, 1);
            this.trainingPlan.exercisesList = [];
        } else if (action.type === 'edit') {
            this.trainingPlan.exercisesList = this.trainingPlan.intervals[action.cacheIndex].exList;
        }
    }

    selectDays() {
        const selectedDays = this.days.filter((el) => {
            return el.checked;
        });
        this.trainingPlan.days = selectedDays;
        this.trainingPlan.count = selectedDays.length;
    }

    validation() {
        let result = true;
        if (!this.trainingPlan.name) {
            this.errors.emptyName = true;
            result = false;
        } else if ((this.trainingPlan.trainingType === 'interval') && (!this.trainingPlan.intervals.length)) {
            result = this.errors.emptyIntervals = true;
            result = false;
        } else if ((this.trainingPlan.trainingType === 'general') && (!this.trainingPlan.exercisesList.length)) {
            result = this.errors.emptyExList = true;
            result = false;
        }
        return result;
    }

    savePlan() {
        if (!this.validation()) {
            return;
        }
        if (this.trainingPlan.trainingType === 'interval') {
            this.trainingPlan.exercisesList = [];
        }
        const sendData: IHttpReq = {
            url: `/api/training-plan`,
            method: 'POST',
            body: this.trainingPlan,
            successMessage: 'Plan created',
        };
        if (this.trainingPlan._id.length) {
            sendData.method = 'PUT';
            sendData.successMessage = 'Plan saved';
            sendData.url += '/' + this.trainingPlan._id;
        } else {
        }

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
            console.log(newCalendarEvent);

            let action = '';

            if (this.trainingPlan.gcalendar_id) {
                this.gcalendar.getEvent(this.trainingPlan.gcalendar_id, (error, event) => {
                    if (error && (error === 'Not Found' || error === 'Not found')) {
                        action = 'add';
                    } else if (!action && error) {
                        action = '';
                    } else if (!action && event.result.status === 'cancelled') {
                        action = 'add';
                    } else if (!action) {
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
                                    this.trainingPlan._id = res._id;
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
                            this.trainingPlan._id = res._id;
                        }
                    }
                });
        }
    }
}
