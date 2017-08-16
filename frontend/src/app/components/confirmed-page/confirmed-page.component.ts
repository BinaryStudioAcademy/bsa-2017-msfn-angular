import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmedPageService } from './confirmed-page.service';

@Component ({
    selector: 'app-confirmed-page',
    templateUrl: './confirmed-page.component.html',
    styleUrls: ['./confirmed-page.component.scss'],
})
export class ConfirmedPageComponent implements OnInit {
    registered = false;
    changedRoot = false;


    constructor(private route: ActivatedRoute, private confirmedPageService: ConfirmedPageService ) { }

    ngOnInit() {
        const type = this.route.snapshot.params['type'];
        const token = this.route.snapshot.params['token'];

        if (type === 'registration') {
            let registered = false;
            this.confirmedPageService.checkRegistrationToken(token, (err, res) => {
                if (!err) {
                    registered = true;
                }
            });

            if (registered) {
                this.registered = true;
            }
        } else if (type === 'rootemail') {
            let changedRoot = false;
            this.confirmedPageService.checkRootEmailToken(token, (err, res) => {
                if (!err) {
                    changedRoot = true;
                }
            });

            if (changedRoot) {
                this.changedRoot = true;
            }
        }

    }

    resendRegisteredConfirmation() {
        console.log('resendRegisteredConfirmation');
    }
}
