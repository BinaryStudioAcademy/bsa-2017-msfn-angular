import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sidebar-view',
    templateUrl: './sidebar-view.component.html',
    styleUrls: ['./sidebar-view.component.scss']
})
export class SidebarViewComponent implements OnInit {
    touchpad: boolean;
    constructor() { }

    ngOnInit() {
        this.touchpad = this.is_touch_device();
    }

    is_touch_device() {
        return 'ontouchstart' in window;
    }
}
