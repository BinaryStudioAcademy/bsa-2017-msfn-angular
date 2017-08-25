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

    constructor( ) { }

    run(): void {
        this.runned = true;
        if (this.warming) { this.warmingUp(); }
        const start = this.cacheTime = (this.cacheTime) ? (Date.now() - (this.pauseTime - this.cacheTime)) : Date.now();
        this.intervalID = setInterval(() => {
            this.secndomerNum = (Date.now() - start);
        }, 52);
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
        this.warming = false;
        this.secndomerNum = 0;
        this.pauseTime = 0;
        this.cacheTime = 0;
        this.lapCacheTime = 0;
        this.lapPauseTime = 0;
        this.secndomerLapNum = 0;
        this.secndomerPreviousLapNum = 0;
        this.warmOuts = [];
    }

    warmingUp(): void {
        this.warming = true;
        const startLap = this.lapCacheTime = (this.lapCacheTime) ? (Date.now() - (this.lapPauseTime - this.lapCacheTime)) : Date.now();
        this.intervalLapID = setInterval(() => {
            this.secndomerLapNum = (Date.now() - startLap);
        }, 52);
    }

    stopWarm(): void {
        this.warming = false;
        clearInterval(this.intervalLapID);
        this.lapCacheTime = 0;
        this.lapPauseTime = 0;
        this.warmingTime += this.secndomerLapNum;
        this.secndomerPreviousLapNum = this.secndomerLapNum;
    }
}
