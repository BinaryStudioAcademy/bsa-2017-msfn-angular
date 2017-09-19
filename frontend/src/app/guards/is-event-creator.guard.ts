import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {WindowObj} from '../services/window.service';
import {EventService} from '../user/services/event.service';

@Injectable()
export class IsEventCreatorGuard implements CanActivate {
    constructor(private router: Router,
                private window: WindowObj,
                private eventService: EventService,
                public activatedRoute: ActivatedRoute) {}

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return this.isEventCreator();
    }

    isEventCreator() {
        console.log('SNAPSHOT', this.activatedRoute.snapshot);
        // const eventId = this.activatedRoute.snapshot.parent.params.id;
        console.log('ROUTER', this.router);
        const eventId = '';

        this.eventService.getItem(eventId, data => {
            if ((this.window.data._injectedData as any).userId === data.creator) {
                return true;
            }
            this.router.navigate(['/']);
            return false;
        });
    }
}
