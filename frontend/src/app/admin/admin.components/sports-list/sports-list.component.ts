import { SportsListService } from './sports-list.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sports-list',
    templateUrl: './sports-list.component.html',
    styleUrls: ['./sports-list.component.scss'],
    providers: [SportsListService]
})
export class SportsListComponent implements OnInit {

    private data: any[];
    private itemsDropped: any[] = [];
    private showPlaceholder = false;

    dragOptions = {
        animation: 200,
        ghostClass: 'ghost',
        filter: '.add-container',
        group: 'sport',
        store: {
            /**
             * Get the order of elements. Called once during initialization.
             * @param   {Sortable}  sortable
             * @returns {Array}
             */
            get: (sortable) => {
                const order = localStorage.getItem(sortable.options.group.name);
                return order ? order.split('|') : [];
            },
            /**
             * Save the order of elements. Called onEnd (when the item is dropped).
             * @param {Sortable}  sortable
             */
            set: (sortable) => {
                const order = sortable.toArray();
                localStorage.setItem(sortable.options.group.name, order.join('|'));
            }
        }
    };

    constructor(private sportsListService: SportsListService) { }

    ngOnInit() {
        this.sportsListService.getKindsOfSport((data) => {
            if (data.length === 1 && !data[0].code) {
                this.data = [];
            } else {
                this.data = data;
            }

        });
    }

}
