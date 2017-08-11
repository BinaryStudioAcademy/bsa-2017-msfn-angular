import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { WindowObj } from './../services/window.service';

@Injectable()
export class IsLoggedOutGuard implements CanActivate {
  constructor(private router: Router, private window: WindowObj) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log('out==', this.window.data._injectedData.isLoggedIn);
      if (this.window.data._injectedData.isLoggedIn === false || this.window.data._injectedData.isLoggedIn === undefined) { return true; }

      this.router.navigate(['/profile']);
      return false;
  }
}
