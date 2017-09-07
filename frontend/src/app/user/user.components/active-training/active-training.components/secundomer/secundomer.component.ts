import { Component, OnInit, OnChanges, OnDestroy, EventEmitter, Input, Output } from '@angular/core';
import { SecundomerService } from './secundomer.service';

@Component({
    selector: 'app-secundomer',
    templateUrl: 'secundomer.component.html',
    styleUrls: ['secundomer.component.scss'],
    providers: [
        SecundomerService
    ]
})

export class SecundomerComponent implements OnInit, OnChanges, OnDestroy {

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
    showedEx: any;
    nextShowedEx: any;
    history = [];

    restEx = {
        exercise: {
            name: 'REST',
            image: []
        }
    };


    constructor(
        public secundomerService: SecundomerService
    ) { }

    ngOnChanges(changes) {
        if (changes.finishTrain && changes.finishTrain.currentValue === true) {
            this.secundomerService.stopTimers();
            this.history = [];
            this.firstRun = true;
            this.pauseMode = false;
            this.lap = 0;
        } else if (changes.finishTrain && changes.finishTrain.currentValue === 'continue') {
            this.run(this.firstRun);
            this.startTimer(this.firstRun, this.lap % 2);
        } else if (changes.reloadIntervals) {
            this.intervals.forEach((el) => {
                el.checked = true;
            });
            this.choosedIntervals = this.generateIntervalArray(this.intervals);
        }

        if (changes.reloadIntervals && !changes.reloadIntervals.firstChange) {
            this.showExercises.emit(this.choosedIntervals[0].exList);
        }
    }

    ngOnInit() {
        this.intervals.forEach((el) => {
            el.checked = true;
        });
        if (this.intervals && this.intervals.length) {
            this.choosedIntervals = this.generateIntervalArray(this.intervals);
            this.showExercises.emit(this.choosedIntervals[0].exList);
        }
    }

    ngOnDestroy() {
        this.secundomerService.stopTimers();
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
        const formatter = new Intl.DateTimeFormat('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'UTC'
        });
        return formatter.format(millisecnods);
    }

    exerciseShow(exList, time) {
        // mega math formula
        const result = Math.floor((time - this.secundomerService.timer) / Math.ceil(time / exList.length));
        this.nextShowedEx = (exList[result + 1] && !(this.lap % 2)) ? exList[result + 1].exercise.name : 'REST';

        if (this.lap % 2) {
            this.showedEx = this.restEx;
        } else if (exList[result]) {
            this.showedEx = exList[result];
        }
    }
// secundomer functions
    run(firstRun?): void {
        this.secundomerService.run();
        if (firstRun) {
            this.onStart.emit();
            this.firstRun = false;
        }
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
        if (!this.lap && firstRun) {
            this.onStart.emit();
        }
        if (firstRun) {
            if (this.choosedIntervals[this.lap]) {
                this.firstRun = false;
                this.setTime(this.choosedIntervals[this.lap].lapTime, this.choosedIntervals[this.lap].warmTime);
            } else {
                this.errorName = 'emptyIntervalList';
            }
        }

        if (this.choosedIntervals[this.lap]) {
            this.secundomerService.startTimer(this.lap, rest, this.pauseMode, (refreshShow) => {
                if (refreshShow) {
                    return this.exerciseShow(this.choosedIntervals[this.lap].exList, this.secundomerService.timerLapNum);
                }
                if (this.choosedIntervals[this.lap + 1]) {
                    this.lapTimer();
                } else {
                    this.finishInterval();
                }
            });
            this.pauseMode = false;
            this.showExercises.emit(this.choosedIntervals[this.lap].exList);
            this.exerciseShow(this.choosedIntervals[this.lap].exList, this.secundomerService.timerLapNum);
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

    finishInterval() {
        let lap = 0, warm = 0;
        const resArr = [];
        this.history.forEach((element, i) => {
            if (i % 2) {
                warm += element;
            } else {
                lap += element;
            }
            resArr.push(this.beautifierTime(element));
        });
        const data = {
            timeIntervals: resArr,
            total: this.beautifierTime(lap),
            warming: this.beautifierTime(warm)
        };
        this.pause();
        this.pauseTimer();
        this.onFinish.emit(data);
    }

    setTime(lap, warm) {
        this.secundomerService.timerLapNum = lap * 60 * 1000;
        this.secundomerService.timerWarmNum = warm * 60 * 1000;

        if (this.lap % 2) {
            this.history.push(this.secundomerService.timerLapNum - this.secundomerService.timer);
            this.history.push(this.secundomerService.timerWarmNum);
        } else if (this.lap) {
            this.history[this.history.length - 1] -= this.secundomerService.timer;
        }
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
