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

    period = {
        startDate: new Date,
        endDate:  new Date(new Date().getTime() + 604800000)
    };
    events: any[] = [];

    ngOnInit() {
        this.getAllEvents();
        console.log(this.period);
    }

    getAllEvents(): void {
        this.events = [];
        this.eventService.getAllItems(data => {
            this.events = data;
            console.log(data);
            this.setDateOutput(this.events);
        });
    }

    getPeriodEvents(): void {
        this.events = [];
        this.eventService.getPeriodItems(this.period, data => {
            this.events = data;
            console.log(data);
            this.setDateOutput(this.events);
        });
    }

    setDateOutput(items: any[]): void {
        for (const item of items) {
            item.startDateOutput = this.dateService
                .convertDateToIso(new Date(item.startDate), true);
            item.endDateOutput = this.dateService
                .convertDateToIso(new Date(item.endDate), true);
        }
    }
}
