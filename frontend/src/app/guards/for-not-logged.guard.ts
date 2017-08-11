import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { WindowObj } from '../services/window.service';

@Injectable()
export class ForNotLoggedGuard implements CanActivate {
    constructor(private window: WindowObj) {
    }

    canActivate(next: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        console.log(this.window.data._injectedData); // дістати звідси чи користувач залогінений та повернути
        return !this.window.data._injectedData.isLoggedIn;
    }
}
