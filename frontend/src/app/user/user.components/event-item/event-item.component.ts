import {Component, OnInit} from '@angular/core';
import {EventService} from '../../services/event.service';

@Component({
    selector: 'app-event-item',
    templateUrl: './event-item.component.html',
    styleUrls: ['./event-item.component.scss'],
    providers: [EventService]
})
export class EventItemComponent implements OnInit {

    constructor(private eventService: EventService) {
    }

    ngOnInit() {
    }

}
