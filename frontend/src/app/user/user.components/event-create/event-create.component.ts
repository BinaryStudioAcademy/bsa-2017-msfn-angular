import {Component, OnInit} from '@angular/core';
import {EventService} from '../../services/event.service';

@Component({
    selector: 'app-event-create',
    templateUrl: './event-create.component.html',
    styleUrls: ['./event-create.component.scss'],
    providers: [EventService]
})
export class EventCreateComponent implements OnInit {

    constructor(private eventService: EventService) {
    }

    ngOnInit() {
    }

}
