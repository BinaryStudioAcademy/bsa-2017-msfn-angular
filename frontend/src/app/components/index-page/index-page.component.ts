import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-index-page',
    templateUrl: './index-page.component.html',
    styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit {

    public test = ['test', 'test1'];
    public options = ['qwetqewt', 'gqwegqewg', 'gqwegqweg', 'gqewgqewg', 'gqwegqweg', 'hdhdfghd', '47ythsrtd'];

    constructor() {
    }

    ngOnInit() {
    }

}
