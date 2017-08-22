import { SportsListService } from './sports-list.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sports-list',
    templateUrl: './sports-list.component.html',
    styleUrls: ['./sports-list.component.scss'],
    providers: [SportsListService]
})
export class SportsListComponent implements OnInit {

    private data = [
        {
            position: 0,
            code: 0
        },
        {
            position: 1,
            code: 1
        },
        {
            position: 2,
            code: 2
        }
    ];
    private cach: number;
    private itemsDropped: any[] = [];
    private showPlaceholder = false;

    dragOptions = {
        animation: 200,
        ghostClass: 'ghost',
        filter: '.add-container',
        group: 'sport',
        onStart: () => {
            this.cach = this.data.length;
        },
        onEnd: (evt) => {
            if (this.cach === this.data.length) {
                this.data.forEach((element, index) => {
                    element.position = index;
                });
                // console.log(evt.item.position);
                // console.log(this.data);
            }
        },
        onSort: function (evt) {
            console.log('yebani rot');
        },
    };

    constructor(private sportsListService: SportsListService) { }

    ngOnInit() {
        this.data.sort(function (a, b) {
            console.log('sort');
            return a.position - a.position;
        });
        // this.sportsListService.getKindsOfSport((data) => {
        //     if (data.length === 1 && !data[0].code) {
        //         this.data = [];
        //     } else {
        //         // uncomment this for sorting by position field

        //         // data.sort(function (a, b) {
        //         //     return a.position - a.position;
        //         // });
        //         this.data = data;
        //     }

        // });
    }

}
