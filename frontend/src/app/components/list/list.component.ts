import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

    public input: string;

    @Input() items: string[];
    @Input() placeholder: string;
    @Input() options: string[];
    @Output() onChangedList = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    addItem() {
        setTimeout(() => {
            if (this.input) {
                if (this.items.indexOf(this.input) === -1) {
                    this.items.push(this.input);
                }
                this.input = '';
                this.onChangedList.emit();
            }
        }, 0);
    }

    deleteItem(index) {
        this.items.splice(index, 1);
        this.onChangedList.emit();
    }
}
