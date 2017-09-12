import {Component, OnInit} from '@angular/core';
import {EventService} from '../../services/event.service';

@Component({
    selector: 'app-event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.scss'],
    providers: [EventService]
})
export class EventListComponent implements OnInit {

    constructor(private eventService: EventService) {
    }

    ngOnInit() {
    }

}
