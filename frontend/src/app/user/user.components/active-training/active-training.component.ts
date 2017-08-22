import { Component } from '@angular/core';

@Component({
    selector: 'app-active-training',
    templateUrl: 'active-training.component.html',
    styleUrls: ['active-training.component.scss']
})
export class ActiveTrainingComponent {
    mode: string = 'secundomer';
    chooseMode(mode: string): void {
        this.mode = mode;
    }
}
