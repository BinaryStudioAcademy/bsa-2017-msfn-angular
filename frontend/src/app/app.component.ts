/// <reference path="../../../typings/webapi.d.ts" />
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { WindowObj } from './services/window.service';
import {ConstantsService} from './services/constants.service';

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
export class AppComponent implements OnInit {
    isLoggedIn = false;
    constructor(private _windowObj: WindowObj,
                public constantsService: ConstantsService) {
        this.isLoggedIn = this._windowObj.data._injectedData.isLoggedIn;
    }

    ngOnInit() {}
}
