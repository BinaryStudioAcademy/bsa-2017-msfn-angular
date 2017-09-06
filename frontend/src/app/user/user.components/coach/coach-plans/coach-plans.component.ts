import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';

@Component({
    selector: 'app-coach-plans',
    templateUrl: './coach-plans.component.html',
    styleUrls: [
        './coach-plans.component.scss',
        '../coach.component.scss'
    ]
})
export class CoachPlansComponent implements OnInit {

    title = 'Training Plans';

    plans = [
        {
            title: 'Praesent feugiat',
            exercises: [
                'Dumbbell Goblet Squat',
                'Dumbbell Lunges Walking',
                'Bent Over Barbell Row',
                'Chin-ups',
                'V-Bar Pulldown'
            ],
            description: 'Cras ac erat mattis, elementum ipsum sit amet, feugiat ante.' +
            'Aliquam velit turpis, sollicitudin ut ullamcorper tristique, eleifend ac turpis.' +
            'Ut molestie est at ex consectetur, eu gravida lectus suscipit.' +
            'In in leo sit amet felis venenatis faucibus. Mauris sapien ex, malesuada id turpis at.'
        },
        {
            title: 'Duis aliquet',
            exercises: [
                'Rack Deadlift',
                'Close-grip Lat Pull Down',
                'Deficit Deadlift',
                'Straight-arm Pull Down (bar Attachment)',
                'Bent Over Rowing'
            ],
            description: 'Maecenas consectetur scelerisque orci.' +
            'Vestibulum sagittis dictum velit, posuere iaculis lorem egestas nec.' +
            'Donec ligula odio, sollicitudin eleifend arcu nec, rhoncus semper felis.' +
            'Aliquam dignissim in arcu quis tincidunt.' +
            'Praesent non hendrerit leo. Sed imperdiet id quam sed vestibulum.'
        }
    ];

    paginatorOutput: any[];

    pageSizeOptions = [2, 4, 5];
    pageEvent: PageEvent = {
        pageIndex: 0,
        pageSize: 2,
        length: this.plans.length
    };

    ngOnInit() {
        this.makePaginatorOutput();
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
