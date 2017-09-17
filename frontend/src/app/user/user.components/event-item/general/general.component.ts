import {Component, Input, OnInit} from '@angular/core';
import {EventService} from '../../../services/event.service';
import {DateService} from '../../../../services/date.service';
import {ActivatedRoute} from '@angular/router';
import {WindowObj} from '../../../../services/window.service';

@Component({
    selector: 'app-general',
    templateUrl: './general.component.html',
    styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

    constructor(public activatedRoute: ActivatedRoute,
                private eventService: EventService,
                private dateService: DateService,
                private window: WindowObj) {
    }

    private _userId = this.window.data._injectedData.userId;
    @Input() event;

    ngOnInit() {
        if (this.activatedRoute.snapshot.parent.params.id) {
            const eventId = this.activatedRoute.snapshot.parent.params.id;
            this.getEvent(eventId);
        }
    }


    getEvent(id: string): void {
        this.eventService.getItem(id, data => {
            this.event = data;
            console.log(data);
            this.setDateOutput(this.event);
            this.isUserApplied(this.event);
        });
    }

    setDateOutput(item): void {
        item.startDateOutput = this.dateService
            .convertDateToIso(new Date(item.startDate), true);
        item.endDateOutput = this.dateService
            .convertDateToIso(new Date(item.endDate), true);
    }

    isUserApplied(event) {
        if (event.participants.includes(this._userId)) {
            event.isParticipating = true;
        }
        if (event.followers.includes(this._userId)) {
            event.isParticipating = true;
        }
    }
}
