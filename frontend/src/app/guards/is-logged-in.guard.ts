import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { WindowObj } from './../services/window.service';

@Injectable()
export class IsLoggedInGuard implements CanActivate {
    constructor(private router: Router, private window: WindowObj) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            console.log(this.window.data._injectedData);
            if ((this.window.data._injectedData as any).isLoggedIn === true) {
                return true;
            }
            this.router.navigate(['/']);
            return false;
    }
}
