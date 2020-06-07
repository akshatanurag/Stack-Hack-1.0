import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SignupService } from '../services/signup.service';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router, private authService: SignupService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
    return this.authService.user
    .pipe(
      take(1),
      map(user => {
        const isAuthenticated = !!user;
        if (isAuthenticated) {
          return true;
        } else {
          return this.router.createUrlTree(['/signin']);
        }
      })
    )
  }
}
