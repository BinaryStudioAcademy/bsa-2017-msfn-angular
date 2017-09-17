import {Component, OnInit} from '@angular/core';
import {EventService} from '../../services/event.service';
import {DateService} from '../../../services/date.service';
import {IEvent} from '../../../models/event';
import {ActivatedRoute} from '@angular/router';
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
                private dateService: DateService,
                private window: WindowObj) {
    }

    private _userId = this.window.data._injectedData.userId;

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
            this.eventService.isUserApplied(this.event, this._userId);
        });
    }

}
