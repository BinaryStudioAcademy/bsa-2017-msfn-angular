import { Component, OnInit } from '@angular/core';
import { FinishDialogComponent } from '../finish-dialog/finish-dialog.component';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
    selector: 'app-secundomer',
    templateUrl: 'secundomer.component.html',
    styleUrls: ['secundomer.component.scss']
})



export class SecundomerComponent implements OnInit {
    warmOuts = [];
    runned: boolean;
    warming: boolean;
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
    dialogRef: MdDialogRef<any>;

    constructor(
        private dialog: MdDialog
    ) { }
    beautifierTime(millisecnods: number): string {
        const formatter = new Intl.DateTimeFormat('ru', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        return formatter.format(millisecnods - 3000 * 60 * 60) + ':' + String(millisecnods).slice(-3);
    }
    run(id: string): void {
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
    finish(): void {
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

    endWarmingUp(): void {
        this.warming = false;
        clearInterval(this.intervalLapID);
        this.lapCacheTime = 0;
        this.lapPauseTime = 0;
        this.warmOuts.push({
            total: this.beautifierTime(this.secndomerNum),
            lap: this.beautifierTime(this.secndomerLapNum),
        });
        this.secndomerPreviousLapNum = this.secndomerLapNum;
    }

    ngOnInit() {

    }

    openFinishDialog() {
        this.dialogRef = this.dialog.open(FinishDialogComponent, {
            data: {
            total: this.beautifierTime(this.secndomerNum),
            calories: 328,
            }
    });
        this.dialogRef.afterClosed().subscribe(result => {
            if (result) {
                console.log('Finish');
                this.endWarmingUp();
            }
        });
    }

}
