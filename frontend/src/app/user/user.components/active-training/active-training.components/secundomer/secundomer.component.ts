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


    constructor(
        public secundomerService: SecundomerService
    ) { }

    ngOnChanges(changes) {
        if (changes.finishTrain && changes.finishTrain.currentValue === true) {
            this.secundomerService.stopTimers();
            this.firstRun = true;
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
    }

    generateIntervalArray(array) {
        const res = [];
        array.forEach(elem => {
            for (let i = 0; i < elem.count; i++) {
                const cycle = JSON.parse(JSON.stringify(elem));
                const rest = JSON.parse(JSON.stringify(elem));
                cycle.name += ' - LAP' + (i + 1);
                rest.name += ' - REST';
                res.push(cycle);
                res.push(rest);
            }
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
            this.firstRun = false;
            if (this.choosedIntervals[this.lap]) {
                this.setTime(this.choosedIntervals[this.lap].lapTime, this.choosedIntervals[this.lap].warmTime);
            }
        }
        this.secundomerService.startTimer(this.lap, rest, () => {
            if (this.choosedIntervals[this.lap + 1]) {
                this.lapTimer();
            } else {
                this.finishInterval();
            }
        });
        this.showExercises.emit(this.choosedIntervals[this.lap].exList);
    }

    lapTimer() {
        this.lap++;
        this.clearTimer();
        this.startTimer(true, this.lap % 2);
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
        this.lap = 0;
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
    }

}
