import {Injectable} from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    ActivatedRoute
} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {WindowObj} from '../services/window.service';

@Injectable()
export class IsEventCreatorGuard implements CanActivate {
    constructor(private router: Router,
                private window: WindowObj,
                public activatedRoute: ActivatedRoute) {}

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return this.isEventCreator(next.params.userId, next.parent.params.id);
    }

    isEventCreator(userId, eventId) {
        if (userId === this.window.data._injectedData.userId) {
            return true;
        }
        this.router.navigate([`/user/events/${eventId}/general`]);
        return false;
    }
}
