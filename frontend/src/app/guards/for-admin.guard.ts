import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ForAdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
       return this.isAdmin();
  }

  isAdmin(): boolean {
    if ((window as any)._injectedData.role === 'admin') { return true; }

    this.router.navigate(['/login']);   // can be change to main page or special-forbidden-page
    return false;
  }
}
