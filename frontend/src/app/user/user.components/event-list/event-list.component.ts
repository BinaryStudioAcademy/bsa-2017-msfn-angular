import {Component, OnInit} from '@angular/core';
import {EventService} from '../../services/event.service';
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

    applicationAction(category: string, event): void {
        if (event.isParticipating) {
            this.unapply(category, event);
        } else {
            this.apply(category, event);
        }
    }

    apply(category, event): void {
        console.log('PART EVENT', event._id);
        this.eventService.apply(category, event._id, this._userId, () => {
            if (category === 'participants') {
                event.isParticipating = true;
            } else {
                event.isFollowing = true;
            }
            this.eventService.getApplicants(category, event._id, data => {
                event[category] = data;
            });
        });
    }

    unapply(category, event): void {
        this.eventService.unapply(category, event._id, this._userId, () => {
            event.isParticipating = false;
            this.eventService.getApplicants(category, event._id, data => {
                event[category] = data;
            });
        });
    }
}
