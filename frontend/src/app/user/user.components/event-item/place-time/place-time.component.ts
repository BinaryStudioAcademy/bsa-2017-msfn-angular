import {Component, Input, OnInit} from '@angular/core';
import {EventService} from '../../../services/event.service';
import {DateService} from '../../../../services/date.service';
import {ActivatedRoute} from '@angular/router';

declare const google: any;

@Component({
    selector: 'app-place-time',
    templateUrl: './place-time.component.html',
    styleUrls: ['./place-time.component.scss'],
    providers: [
        DateService,
        EventService
    ]
})
export class PlaceTimeComponent implements OnInit {

    constructor(public activatedRoute: ActivatedRoute,
                private eventService: EventService) {
    }

    @Input() event;
    validCoords: boolean = false;

    ngOnInit() {
        if (this.activatedRoute.snapshot.parent.params.id) {
            const eventId = this.activatedRoute.snapshot.parent.params.id;
            this.getEvent(eventId);
        }
    }

    initMap(): void {
        const centerCoords = this.event.location.coords;
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: centerCoords
        });
        const marker = new google.maps.Marker({
            position: centerCoords,
            map: map,
            animation: google.maps.Animation.DROP,
        });

        map.addListener('mouseout', () => {
            map.setOptions({center: centerCoords});
        });
    }

    getEvent(id: string): void {
        this.eventService.getItem(id, data => {
            this.event = data;
            this.eventService.setDateOutput(this.event);
            if (this.event.location.coords.lat !== null && this.event.location.coords.lng !== null) {
                this.validCoords = true;
                this.initMap();
            }
        });
    }
}
