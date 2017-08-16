/// <reference path="../../../typings/webapi.d.ts" />
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { WindowObj } from './services/window.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [
        './app.component.scss',
        '../globalStyles/materialTheme.scss',
        '../globalStyles/reboot.scss'
    ],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    isLoggedIn = false;
    constructor(private _windowObj: WindowObj) {
        this.isLoggedIn = this._windowObj.data._injectedData.isLoggedIn;
    }
}
