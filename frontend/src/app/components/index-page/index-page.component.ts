import { Component, OnInit } from '@angular/core';
import { WindowObj } from '../../services/window.service';

@Component({
    selector: 'app-index-page',
    templateUrl: './index-page.component.html',
    styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit {

    public isLoggedIn: boolean;

    constructor(public window: WindowObj) {
        this.isLoggedIn = window.data._injectedData.isLoggedIn;
    }

    ngOnInit() {
    }

}
