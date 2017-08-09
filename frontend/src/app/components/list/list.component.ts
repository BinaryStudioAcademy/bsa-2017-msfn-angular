import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    public input: string;

    @Input() items: string[];
    @Input() placeholder: string;

    constructor() {
    }

    ngOnInit() {
        console.log(this.items);
    }

    addItem(e) {
        if (e.keyCode !== 13) { return; }

        if (this.input) {
            e.preventDefault();
            this.items.push(this.input);
            this.input = '';
        }
    }

    deleteItem(index) {
        this.items.splice(index, 1);
    }
}
