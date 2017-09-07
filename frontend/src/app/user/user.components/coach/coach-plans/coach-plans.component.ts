import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { CoachService } from '../coach.service';

@Component({
    selector: 'app-coach-plans',
    templateUrl: './coach-plans.component.html',
    styleUrls: [
        './coach-plans.component.scss',
        '../coach.component.scss'
    ]
})
export class CoachPlansComponent implements OnInit {

    constructor(private coachService: CoachService) { }

    @Input() userData;
    title = 'Training Plans';
    plans = [];

    paginatorOutput: any[];

    pageSizeOptions = [2, 4, 5];
    pageEvent: PageEvent = {
        pageIndex: 0,
        pageSize: 2,
        length: this.plans.length
    };

    ngOnInit() {
        console.log(this.userData);
        this.coachService.getTrainingPlans(this.userData._id, res => {
            this.plans = res;
            this.makePaginatorOutput();
            console.log(this.plans);
        });
    }

    makePaginatorOutput() {
        this.paginatorOutput = [];
        const startPos = this.pageEvent.pageIndex * this.pageEvent.pageSize;
        let pageSize = startPos + this.pageEvent.pageSize;
        pageSize = pageSize > this.plans.length ? this.plans.length : pageSize;

        for (let i = startPos; i < pageSize; i++) {
            this.paginatorOutput.push(this.plans[i]);
        }
    }
}
