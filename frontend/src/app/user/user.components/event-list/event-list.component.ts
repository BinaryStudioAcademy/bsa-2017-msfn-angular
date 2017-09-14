import {Component, OnInit} from '@angular/core';
import {EventService} from '../../services/event.service';
import {DateService} from '../../../services/date.service';

@Component({
    selector: 'app-event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.scss'],
    providers: [
        EventService,
        DateService
    ]
})
export class EventListComponent implements OnInit {

    constructor(private eventService: EventService,
                private dateService: DateService) {
    }

    events = [];

    ngOnInit() {
        this.getEvents();
    }

    getEvents() {
        this.eventService.getAllItems(data => {
            this.events = data;
            console.log(data);

            for (const event of this.events) {
                event.startDateOutput = this.dateService
                    .convertDateToIso(new Date(event.startDate), true);
                event.endDateOutput = this.dateService
                    .convertDateToIso(new Date(event.endDate), true);
            }
        });
    }
}
