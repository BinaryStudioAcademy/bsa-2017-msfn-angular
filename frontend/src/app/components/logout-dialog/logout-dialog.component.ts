import { MD_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { HttpService } from './../../services/http.service';
import { IHttpReq } from './../../models/http-req';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
    selector: 'app-logout-dialog',
    templateUrl: './logout-dialog.component.html',
    styleUrls: ['./logout-dialog.component.scss']
})
export class LogoutDialogComponent implements OnInit {

    constructor(
        @Inject(MD_DIALOG_DATA) public data: any,
        private httpHandler: HttpService,
        private router: Router
    ) { }

    ngOnInit() {
    }

    logout() {
        const sendData: IHttpReq = {
            url: '/api/logout',
            method: 'POST',
            body: {}
        };
        this.httpHandler.sendRequest(sendData)
            .then((res) => {
                location.reload();
                // this.router.navigate(['/']);
            });
    }
}
