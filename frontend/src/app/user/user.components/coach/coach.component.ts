import { Component, Input, OnInit } from '@angular/core';
import { CoachService } from './coach.service';

@Component({
    selector: 'app-coach-page',
    templateUrl: './coach.component.html',
    styleUrls: ['./coach.component.scss'],
    providers: [CoachService]
})
export class CoachComponent implements OnInit {

    constructor(private coachService: CoachService) {
    }

    @Input() userData;

    ngOnInit() {
        console.log(this.userData);
    }
}
