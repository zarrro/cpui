import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    CanActivateChild
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private auth: AuthService, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        console.log("debug canActivate authenticated: " + this.auth.authenticated);
        if(!this.auth.initialized) {
            return this.auth.authenticate(undefined).pipe(
                tap(isAuth => { if(!isAuth) {
                    this.router.navigate(["/login"]);
                }})
            );
        } else {
            if(!this.auth.authenticated) {
                this.router.navigate(["/login"]);
            }
            return of(this.auth.authenticated);
        }
    }

    canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.canActivate(next, state);
    }

}