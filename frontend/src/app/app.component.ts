/// <reference path="../../../typings/webapi.d.ts" />
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

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
  constructor() { }
}
