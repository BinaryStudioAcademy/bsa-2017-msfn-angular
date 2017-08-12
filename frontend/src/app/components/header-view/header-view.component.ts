import {Component, OnInit, AfterContentChecked} from '@angular/core';
import {MdDialog} from '@angular/material';
import { Router } from '@angular/router';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';
import { HttpService } from '../../services/http.service';
import { IHttpReq } from '../../models/http-req';
import { WindowObj } from '../../services/window.service';

@Component({
    selector: 'app-header-view',
    templateUrl: './header-view.component.html',
    styleUrls: ['./header-view.component.scss']
})
export class HeaderViewComponent implements OnInit, AfterContentChecked  {

    public thereIsLoggedInUser: boolean;
    public displayName: string;
    public notificationCount = 1;
    private notificationsDialogConfig = {
        height: '300px',
        width: '200px',
        data: 'you have ' + this.notificationCount + ' notifications',
        position: {
            top: '45px',
        }
    };
    public userPhotoUrl = (this.window.data._injectedData as any).userPhoto || './resources/default.png';

    constructor(public dialog: MdDialog,
                private httpHandler: HttpService,
                private router: Router,
                public window: WindowObj) {
    }

    ngOnInit() {
        const userData = this.window.data._injectedData;
        this.thereIsLoggedInUser = userData.isLoggedIn;
        this.displayName = `${userData.userFirstName} ${userData.userLastName}`;
    }

    ngAfterContentChecked() {
        this.userPhotoUrl = (this.window.data._injectedData as any).userPhoto || './resources/default.png';
        this.displayName = `${this.window.data._injectedData.userFirstName} ${this.window.data._injectedData.userLastName}`;
    }

    openDialog() {
        const dialogRef = this.dialog.open(NotificationDialogComponent, this.notificationsDialogConfig);
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
                this.router.navigate(['/']);
            });
    }

}
