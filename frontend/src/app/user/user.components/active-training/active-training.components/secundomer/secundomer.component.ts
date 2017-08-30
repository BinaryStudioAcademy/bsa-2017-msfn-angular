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
    lap: number = 0;


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
        this.pauseTimer();
        this.onFinish.emit(data);
    }

    setTime(lap, warm) {
        this.secundomerService.timerLapNum = lap * 60 * 1000;
        this.secundomerService.timerWarmNum = warm * 60 * 1000;
    }

    selectCircles() {
        this.choosedIntervals = this.intervals.filter((el) => {
            return el.checked;
        });
    }
// begin
    startTimer(second?): void {
        if (!second) {
            if (this.choosedIntervals[this.lap]) {
                this.setTime(this.choosedIntervals[this.lap].lapTime, this.choosedIntervals[this.lap].warmTime);
            }
        }
        this.secundomerService.startTimer();
    }

    lapTimer() {
        this.lap++;
        this.clearTimer();
        this.startTimer();
    }
    pauseTimer(): void {
        this.secundomerService.pauseTimer();
    }

    clearTimer(): void {
        this.secundomerService.clearTimer();
    }

    rest(): void {
        this.secundomerService.rest();
    }

    endRest(): void {
        this.secundomerService.endRest();
    }

    finishInterval() {
        const data = {
            total: this.beautifierTime(this.secundomerService.secndomerNum),
            warming: this.beautifierTime(this.secundomerService.warmingTime)
        };
        this.pause();
        this.pauseTimer();
        this.onFinish.emit(data);
    }
    ngOnChanges(changes) {
        if (changes.finishTrain.currentValue === true) {
            this.secundomerService.stopTimers();
        } else if (changes.finishTrain.currentValue === 'continue') {
            this.run();
            this.startTimer(true);
        }
    }

    ngOnInit() {}

}
