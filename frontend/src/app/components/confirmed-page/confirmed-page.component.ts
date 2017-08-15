import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component ({
    selector: 'app-confirmed-page',
    templateUrl: './confirmed-page.component.html',
    styleUrls: ['./confirmed-page.component.scss'],
})
export class ConfirmedPageComponent implements OnInit {
    token: string;
    type: string;
    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.type = this.route.snapshot.params['type'];
        console.log(this.type);
        this.token = this.route.snapshot.params['token'];
        console.log(this.token);
    }
}
