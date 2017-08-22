import { SportsListService } from './sports-list.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sports-list',
    templateUrl: './sports-list.component.html',
    styleUrls: ['./sports-list.component.scss'],
    providers: [SportsListService]
})
export class SportsListComponent implements OnInit {

    private data: any[] = [];
    private itemsDropped: any[] = [];
    private cach: number;

    dragOptions = {
        animation: 200,
        ghostClass: 'ghost',
        filter: '.add-container',
        group: 'sport',
        forceFallback: true,
        // uncomment this for sorting by position field

        // onStart: () => {
        //     this.cach = this.data.length;
        // },
        // onEnd: (evt) => {
        //     if (this.cach === this.data.length) {
        //         this.sportsListService.updateOrder(evt.item.id, evt.newIndex);
        //     }
        // }
    };

    constructor(private sportsListService: SportsListService) { }

    ngOnInit() {
        this.sportsListService.getKindsOfSport((data) => {
            if (data.length === 1 && !data[0].code) {
                this.data = [];
            } else {
                // uncomment this for sorting by position field

                // data.sort(function (a, b) {
                //     return a.position - a.position;
                // });
                this.data = data;
            }

        });
    }

}
