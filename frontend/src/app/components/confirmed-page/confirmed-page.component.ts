import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmedPageService } from './confirmed-page.service';

@Component ({
    selector: 'app-confirmed-page',
    templateUrl: './confirmed-page.component.html',
    styleUrls: ['./confirmed-page.component.scss'],
})
export class ConfirmedPageComponent implements OnInit {
    registered: boolean;
    chagedRoot: boolean;


    constructor(private route: ActivatedRoute, private confirmedPageService: ConfirmedPageService ) { }

    ngOnInit() {
        const type = this.route.snapshot.params['type'];
        const token = this.route.snapshot.params['token'];
        let registered = false;
        let changedRoot = false;

        if (type === 'registration') {
            this.confirmedPageService.checkRegistrationToken(token, res => {
                if (res.ok) {
                    registered = true;
                }
            });

            if (registered) {
                this.registered = true;
            }
        } else if (type === 'rootemail') {
            this.confirmedPageService.checkRootEmailToken(token, res => {
                if (res.ok) {
                    changedRoot = true;
                }
            });

            if (registered) {
                this.chagedRoot = true;
            }
        }

    }
}
