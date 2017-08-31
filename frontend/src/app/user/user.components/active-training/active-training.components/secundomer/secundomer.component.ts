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
    @Input() reloadIntervals: boolean;
    @Input() intervals: [any];
    @Output() onStart = new EventEmitter();
    @Output() onFinish = new EventEmitter();
    @Output() showExercises = new EventEmitter();

    choosedIntervals = [];
    lap: number = 0;
    firstRun: boolean = true;
    pauseMode: boolean = false;
    errorName: string;


    constructor(
        public secundomerService: SecundomerService
    ) { }

    ngOnChanges(changes) {
        if (changes.finishTrain && changes.finishTrain.currentValue === true) {
            this.secundomerService.stopTimers();
            this.firstRun = true;
            this.pauseMode = false;
            this.lap = 0;
        } else if (changes.finishTrain && changes.finishTrain.currentValue === 'continue') {
            this.run();
            this.startTimer(this.firstRun, this.lap % 2);
        } else if (changes.reloadIntervals) {
            this.intervals.forEach((el) => {
                el.checked = true;
            });
            this.choosedIntervals = this.generateIntervalArray(this.intervals);
        }
    }

    ngOnInit() {
        this.intervals.forEach((el) => {
            el.checked = true;
        });
        this.choosedIntervals = this.generateIntervalArray(this.intervals);
        this.showExercises.emit(this.choosedIntervals[0].exList);
    }

    generateIntervalArray(array) {
        const res = [];
        array.forEach(elem => {
            const cycle = JSON.parse(JSON.stringify(elem));
            const rest = JSON.parse(JSON.stringify(elem));
            cycle.name += ' - WORK';
            rest.name += ' - REST';
            res.push(cycle);
            res.push(rest);
        });
        return res;
    }

    beautifierTime(millisecnods: number): string {
        const formatter = new Intl.DateTimeFormat('ru', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        return formatter.format(millisecnods - 3000 * 60 * 60);
    }
// secundomer functions
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

// timer functions
    startTimer(firstRun, rest): void {
        if (firstRun) {
            if (this.choosedIntervals[this.lap]) {
                this.firstRun = false;
                this.setTime(this.choosedIntervals[this.lap].lapTime, this.choosedIntervals[this.lap].warmTime);
            } else {
                this.errorName = 'emptyIntervalList';
            }
        }

        if (this.choosedIntervals[this.lap]) {
            this.secundomerService.startTimer(this.lap, rest, this.pauseMode, () => {
                if (this.choosedIntervals[this.lap + 1]) {
                    this.lapTimer();
                } else {
                    this.finishInterval();
                }
            });
            this.pauseMode = false;
            this.showExercises.emit(this.choosedIntervals[this.lap].exList);
        }
    }

    lapTimer() {
        this.lap++;
        this.clearTimer();
        this.startTimer(true, this.lap % 2);
    }

    pauseTimer(): void {
        this.pauseMode = true;
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

    setTime(lap, warm) {
        this.secundomerService.timerLapNum = lap * 60 * 1000;
        this.secundomerService.timerWarmNum = warm * 60 * 1000;
    }

    selectCircles() {
        this.choosedIntervals = this.generateIntervalArray(
            this.intervals.filter((el) => {
                return el.checked;
            })
        );
        if (this.errorName === 'emptyIntervalList') {
            this.errorName = '';
        }
    }

}
