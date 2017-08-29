import { Component, OnInit, OnChanges, EventEmitter, Input, Output } from '@angular/core';
import { SecundomerService } from './secundomer.service';

@Component({
    selector: 'app-secundomer',
    templateUrl: 'secundomer.component.html',
    styleUrls: ['secundomer.component.scss'],
    providers: [
        SecundomerService
    ]
})

export class SecundomerComponent implements OnInit, OnChanges {

    @Input() finishTrain: boolean;
    @Input() intervals: [any];
    @Output() onStart = new EventEmitter();
    @Output() onFinish = new EventEmitter();
    @Output() showExercises = new EventEmitter();

    choosedIntervals = [];

    constructor(
        public secundomerService: SecundomerService
    ) { }

    beautifierTime(millisecnods: number): string {
        const formatter = new Intl.DateTimeFormat('ru', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        return formatter.format(millisecnods - 3000 * 60 * 60);
    }

    run(): void {
        this.secundomerService.run();
        this.onStart.emit();
    }
    pause(): void {
        this.secundomerService.pause();
    }
    warmingUp(): void {
        this.secundomerService.warmingUp();
    }
    endWarmingUp(): void {
        this.secundomerService.stopWarm();
    }
    finish(): void {
        const data = {
            total: this.beautifierTime(this.secundomerService.secndomerNum),
            warming: this.beautifierTime(this.secundomerService.warmingTime)
        };
        this.pause();
        this.onFinish.emit(data);
    }

    setTime(lap, warm) {
        console.log('setted timer\n  circle time: ' + lap + '\n  rest time: ' + warm);
    }

    selectCircles() {
        this.choosedIntervals = this.intervals.filter((el) => {
            return el.checked;
        });
    }

    ngOnChanges(changes) {
        if (changes.finishTrain.currentValue === true) {
            this.secundomerService.stopTimers();
        } else if (changes.finishTrain.currentValue === 'continue') {
            this.run();
        }
    }

    ngOnInit() {}

}
