import {Component, OnInit} from '@angular/core';
import {EventService} from '../../services/event.service';
import {DateService} from '../../../services/date.service';
import {IEvent} from '../../../models/event';
import {ActivatedRoute} from '@angular/router';
import {WindowObj} from '../../../services/window.service';

declare const google: any;

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
    event = {
        title: '',
        creator: {
            _id: '',
            userPhoto: '',
            fullName: ''
        },
        startDate: '',
        endDate: '',
        location: {
            name: '',
            coords: {
                lat: null,
                lng: null
            }
        },
        description: '',
        image: '',
        participants: [],
        followers: [],
        messages: []
    };

    ngOnInit() {
        if (this.activatedRoute.snapshot.params.id && !this.event) {
            const eventId = this.activatedRoute.snapshot.params.id;
            this.getEvent(eventId);
        }
    }

    getEvent(id: string): void {
        this.eventService.getItem(id, data => {
            this.event = data;
            console.log(data);
            this.setDateOutput(this.event);
            this.isUserApplied(this.event);
            this.initMap();
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

    initMap(): void {
        const centerCoords = {
            lat: this.event.location.coords.lat,
            lng: this.event.location.coords.lng
        };

        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
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
}
