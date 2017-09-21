import { Component, OnInit } from '@angular/core';
import { TribeService } from '../tribe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WindowObj } from '../../../../services/window.service';
import { ToasterService } from '../../../../services/toastr.service';
import { ITribe } from '../../../../models/tribe';

@Component({
    selector: 'app-tribe-list',
    templateUrl: './tribe-list.component.html',
    styleUrls: ['./tribe-list.component.scss'],
    providers: [TribeService]
})
export class TribeListComponent implements OnInit {
    tribes: ITribe[];
    myTribes: ITribe[];
    userId: string;

    constructor(
                private tribeService: TribeService,
                public activatedRoute: ActivatedRoute,
                private router: Router,
                private toasterService: ToasterService,
                private window: WindowObj) {
        this.userId = (this.window.data._injectedData as any).userId;
    }

    ngOnInit() {
        this.tribeService.getAllTribes((resp) => {
            this.tribes = resp;
        });
        this.tribeService.getTribesByCreator(this.userId, (resp) => {
            this.myTribes = resp;
        });
    }

    goToTribe(id) {
        this.router.navigate([`../tribe/${id}`], { relativeTo: this.activatedRoute });
    }

    create() {
        this.router.navigate([`../create-tribe`], { relativeTo: this.activatedRoute });
    }
}
