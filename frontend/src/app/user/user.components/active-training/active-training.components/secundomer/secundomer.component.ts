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
    @Output() onFinish = new EventEmitter();

    constructor(
        public secundomerService: SecundomerService
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
        this.secundomerService.run();
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
        this.onFinish.emit(data);
    }

    ngOnChanges(changes) {
        if (changes.finishTrain.currentValue) {
            this.secundomerService.stopTimers();
        }
    }

    ngOnInit() {}

}
