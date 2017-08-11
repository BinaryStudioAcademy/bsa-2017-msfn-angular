import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
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
export class HeaderViewComponent implements OnInit {

  public thereIsLoggedInUser: boolean;
  public showUserMenu: boolean;
  private notificationsDialogConfig = {
      height: '300px',
      width: '200px',
      data: 'you have N notifications',
      position: {
        top: '45px',
      }
  };

  constructor(
    public dialog: MdDialog,
    private httpHandler: HttpService,
    private router: Router,
    public window: WindowObj
  ) {}

  ngOnInit() {
    this.thereIsLoggedInUser = true;
    this.showUserMenu = false;
  }

  openDialog() {
    const dialogRef = this.dialog.open(NotificationDialogComponent, this.notificationsDialogConfig);
  }

  userMenuDialog() {
    this.showUserMenu = !this.showUserMenu;
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
