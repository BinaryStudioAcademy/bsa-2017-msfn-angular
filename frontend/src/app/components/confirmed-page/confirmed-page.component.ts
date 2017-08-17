import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmedPageService } from './confirmed-page.service';

@Component ({
    selector: 'app-confirmed-page',
    templateUrl: './confirmed-page.component.html',
    styleUrls: ['./confirmed-page.component.scss'],
})
export class ConfirmedPageComponent implements OnInit {
    showRegistered = false;
    showChangedRoot = false;
    showInfo = false;

    constructor(private route: ActivatedRoute, private confirmedPageService: ConfirmedPageService ) { }

    ngOnInit() {
        const type = this.route.snapshot.params['type'];
        const token = this.route.snapshot.params['token'];
        if (type === 'registration') {
            this.confirmedPageService.checkRegistrationToken(token, (err, res) => {
                console.log(res);
                if (res.status === 'ok') {
                    this.showRegistered = true;
                } else {
                    this.showInfo = true;
                }
            });
        } else if (type === 'rootemail') {
            this.confirmedPageService.checkRootEmailToken(token, (err, res) => {
                if (res.status === 'ok') {
                    this.showChangedRoot = true;
                } else {
                    this.showInfo = true;
                }
            });
        }
    }

    resendRegisteredConfirmation() {
    }
}
