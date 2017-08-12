import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { WindowObj } from './../services/window.service';

@Injectable()
export class ForAllUserGuard implements CanActivate {
    constructor(private router: Router, private window: WindowObj) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.isUser();
    }

    isUser(): boolean {
        if ((this.window.data._injectedData as any).role === 'usual'
            || (this.window.data._injectedData as any).role === 'coach') {
            this.router.navigate(['/user']);
            console.log((this.window.data._injectedData as any).role);
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
