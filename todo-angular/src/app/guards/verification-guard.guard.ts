import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SignupService } from '../services/signup.service';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VerificationGuardGuard implements CanActivate {

  constructor(private router: Router, private authService: SignupService) { }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user
    .pipe(take(1), map(user => {
      const isVerified = user.email_status;
      if (isVerified) {
        console.log('VERIFIED USER');
        return true;
      } else {
        return this.router.createUrlTree(['/email-verification']);
      }
    }))
  }
  
}
