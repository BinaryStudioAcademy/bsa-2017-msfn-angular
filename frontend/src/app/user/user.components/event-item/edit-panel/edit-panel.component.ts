import {Component, OnInit, ViewChild} from '@angular/core';
import {EventService} from '../../../services/event.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-edit-panel',
    templateUrl: './edit-panel.component.html',
    styleUrls: ['./edit-panel.component.scss'],
    providers: [EventService]
})
export class EditPanelComponent implements OnInit {

    constructor(public activatedRoute: ActivatedRoute) {
    }

    eventId: string;

    ngOnInit() {
        if (this.activatedRoute.snapshot.parent.params.id) {
            this.eventId = this.activatedRoute.snapshot.parent.params.id;
        }
    }
}
