import { Router } from '@angular/router';
import { TribeService } from './../../../tribe.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-tribe-permissions',
    templateUrl: './tribe-permissions.component.html',
    styleUrls: ['./tribe-permissions.component.scss']
})
export class TribePermissionsComponent implements OnInit {
    tribeID: any;
    tribe: any;
    constructor(private tribeService: TribeService,
    private router: Router) { }

    ngOnInit() {
        this.tribeID = this.router.url.split('/general')[0].split('tribe-settings/').pop();
        this.tribeService.getTribe(this.tribeID, (res) => {
            console.log(res);
            this.tribe = res;
        });
  }

}
