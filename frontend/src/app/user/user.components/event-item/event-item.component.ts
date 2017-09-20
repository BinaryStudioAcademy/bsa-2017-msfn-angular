import {Component, OnInit} from '@angular/core';
import {EventService} from '../../services/event.service';
import {DateService} from '../../../services/date.service';
import {IEvent} from '../../../models/event';
import {ActivatedRoute, Router} from '@angular/router';
import {WindowObj} from '../../../services/window.service';

@Component({
    selector: 'app-event-item',
    templateUrl: './event-item.component.html',
    styleUrls: ['./event-item.component.scss'],
    providers: [
        EventService,
        DateService
    ]
})
export class EventItemComponent implements OnInit {

    constructor(public activatedRoute: ActivatedRoute,
                private eventService: EventService,
                private router: Router,
                private window: WindowObj) {
    }

    userId = this.window.data._injectedData.userId;

    navLinks = [
        {
            link: 'general',
            label: 'General'
        },
        {
            link: 'place-time',
            label: 'Place & Time'
        },
        {
            link: 'discuss',
            label: 'Discuss'
        }
    ];

    event: IEvent;

    ngOnInit() {
        if (this.activatedRoute.snapshot.params.id) {
            const eventId = this.activatedRoute.snapshot.params.id;
            this.getEvent(eventId);
        }
    }

    getEvent(id: string): void {
        this.eventService.getItem(id, data => {
            this.event = data;
            console.log(data);
            this.eventService.setDateOutput(this.event);
            this.eventService.isUserApplied(this.event, this.userId);
        });
    }

    applicationAction(category: string, event): void {
        const status = category === 'participants' ? 'isParticipating' : 'isFollowing';
        if (event[status]) {
            this.unapply(category, event);
        } else {
            this.apply(category, event);
        }
    }

    apply(category, event): void {
        this.eventService.apply(category, event._id, this.userId, () => {
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
        this.eventService.unapply(category, event._id, this.userId, () => {
            if (category === 'participants') {
                event.isParticipating = false;
            } else {
                event.isFollowing = false;
            }
            this.eventService.getApplicants(category, event._id, data => {
                event[category] = data;
            });
        });
    }

    navigateToEditTab() {
        this.router.navigate([`/user/events/${this.event._id}/edit-panel/${this.userId}`]);
    }
}
