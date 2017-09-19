import {Component, OnInit} from '@angular/core';
import {EventService} from '../../services/event.service';
// import {DateService} from '../../../services/date.service';
import {WindowObj} from '../../../services/window.service';

@Component({
    selector: 'app-event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.scss'],
    providers: [
        EventService,
        // DateService
    ]
})
export class EventListComponent implements OnInit {

    constructor(private eventService: EventService,
                // private dateService: DateService,
                private window: WindowObj) {
    }

    private _userId = this.window.data._injectedData.userId;
    events: any[] = [];
    period = {
        startDate: new Date,
        endDate:  new Date(new Date().getTime() + 604800000)
    };

    ngOnInit() {
        this.getAllEvents();         // change to period events
        console.log(this.period);
    }

    getAllEvents(): void {
        this.events = [];
        this.eventService.getAllItems(data => {
            this.events = data;
            console.log(data);
            for (const event of this.events) {
                this.eventService.setDateOutput(event);
                this.eventService.isUserApplied(event, this._userId);
            }
        });
    }

    getPeriodEvents(): void {
        this.events = [];
        this.eventService.getPeriodItems(this.period, data => {
            this.events = data;
            console.log(data);
            for (const event of this.events) {
                this.eventService.setDateOutput(event);
                this.eventService.isUserApplied(event, this._userId);
            }
        });
    }

    participatingAction(event): void {
        if (event.isParticipating) {
            this.unparticipate(event);
        } else {
            this.participate(event);
        }
    }

    followAction(event): void {
        if (event.isFollowing) {
            this.unfollow(event);
        } else {
            this.follow(event);
        }
    }

    participate(event): void {
        console.log('PART EVENT', event._id);
        this.eventService.participate(event._id, this._userId, () => {
            event.isParticipating = true;
            this.eventService.getParticipants(event._id, data => {
                event.participants = data;
            });
        });
    }

    unparticipate(event): void {
        this.eventService.unparticipate(event._id, this._userId, () => {
            event.isParticipating = false;
            this.eventService.getParticipants(event._id, data => {
                event.participants = data;
            });
        });
    }

    follow(event): void {
        this.eventService.follow(event._id, this._userId, () => {
            event.isFollowing = true;
            this.eventService.getFollowers(event._id, data => {
                event.followers = data;
            });
        });
    }

    unfollow(event): void {
        this.eventService.unfollow(event._id, this._userId, () => {
            event.isFollowing = false;
            this.eventService.getFollowers(event._id, data => {
                event.followers = data;
            });
        });
    }
}
