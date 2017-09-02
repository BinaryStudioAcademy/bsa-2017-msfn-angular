import { Injectable } from '@angular/core';

@Injectable()

export class SecundomerService {

    warmOuts = [];
    runned: boolean;
    warming: boolean;
    warmingTime: number = 0;
    intervalID: number;
    intervalLapID: number;
    secndomerNum: number = 0;
    secndomerLapNum: number = 0;
    secndomerPreviousLapNum: number = 0;
    lapCacheTime: number;
    lapPauseTime: number;
    cacheTime: number;
    pauseTime: number;
    resStyle: string;

    cacheView = 0;
    timerLapNum: number;
    timerWarmNum: number;
    timer: number = 0;
    idTimer: number;
    idRest: number;

    constructor( ) { }

    percentToBar(elem, perc) {
        elem.style.background = 'linear-gradient(to right, rgba( '
            + Math.floor(130 - (255 * (1 - perc))) + ', '
            + Math.floor(202 - (255 * (1 - perc))) + ', '
            + Math.floor(156 - (255 * (1 - perc))) + ', 0.9), white 95%)';
        elem.firstElementChild.style.color = 'rgb( '
            + Math.floor(34 + (255 * (1 - perc))) + ', '
            + Math.floor(34 + (255 * (1 - perc))) + ', '
            + Math.floor(34 + (255 * (1 - perc))) + ')';
        perc = (perc < 0.01) ? 0.01 : perc;
        perc = (perc > 0.95) ? 1 : perc;
        elem.style.backgroundPosition = elem.clientWidth * perc + 'px 0px';
    }

    run(): void {
        this.runned = true;
        if (this.warming) { this.warmingUp(); }
        const start = this.cacheTime = (this.cacheTime) ? (Date.now() - (this.pauseTime - this.cacheTime)) : Date.now();
        this.intervalID = setInterval(() => {
            this.secndomerNum = (Date.now() - start);
        }, 250);
    }
    pause(): void {
        this.pauseTime = Date.now();
        this.lapPauseTime = (this.lapCacheTime) ? Date.now() : undefined;
        this.runned = false;
        clearInterval(this.intervalID);
        clearInterval(this.intervalLapID);
    }
    stopTimers(): void {
        this.pause();
        this.clearTimer();
        this.warming = false;
        this.secndomerNum = 0;
        this.pauseTime = 0;
        this.cacheTime = 0;
        this.lapCacheTime = 0;
        this.lapPauseTime = 0;
        this.secndomerLapNum = 0;
        this.secndomerPreviousLapNum = 0;
        this.timer = 0;
        this.timerLapNum = 0;
        this.timerWarmNum = 0;
        this.warmOuts = [];
    }
    warmingUp(): void {
        this.warming = true;
        const startLap = this.lapCacheTime = (this.lapCacheTime) ? (Date.now() - (this.lapPauseTime - this.lapCacheTime)) : Date.now();
        this.intervalLapID = setInterval(() => {
            this.secndomerLapNum = (Date.now() - startLap);
        }, 250);
    }
    stopWarm(): void {
        this.warming = false;
        clearInterval(this.intervalLapID);
        this.lapCacheTime = 0;
        this.lapPauseTime = 0;
        this.warmingTime += this.secndomerLapNum;
        this.secndomerPreviousLapNum = this.secndomerLapNum;
    }

    // timer

    startTimer(i, rest, change, callback): void {
        console.log('lap - ' + i);
        this.runned = true;
        if (!change) {
            this.timer = (rest) ? this.timerWarmNum : this.timerLapNum;
        }
        this.cacheView = this.timer;
        console.log(change);
        console.log(this.timer);
        this.idTimer = setInterval( () => {
            this.timer -= 250;
            this.percentToBar(document.getElementById('interval' + i), (this.cacheView - this.timer) / this.cacheView);
            if (this.timer <= 0) {
                this.timer = 0;
                this.clearTimer();
                callback();
            }
        }, 250);
    }

    pauseTimer(): void {
        clearInterval(this.idTimer);
        this.runned = false;
    }

    clearTimer(): void {
        clearInterval(this.idTimer);
        clearInterval(this.idRest);
        this.timerLapNum = 0;
        this.timerWarmNum = 0;
        this.runned = false;
    }

    rest(): void {
        this.warming = true;
        this.idRest = setInterval( () => {
            this.timerWarmNum -= 250;
            if (this.timerWarmNum <= 0) {
                this.timerWarmNum = 0;
                this.clearTimer();
            }
        }, 250);
    }

    endRest(): void {
        this.warming = false;
        clearInterval(this.idRest);
    }
}
