import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams, HttpHeaders } from '@angular/common/http';
import { SignupService } from './signup.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authService: SignupService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user
    .pipe(
      take(1),
      exhaustMap(user => {
        if (!user) return next.handle(req);

        const modifiedReq = req.clone({
          // params: new HttpParams().set('X-Auth-Token', user.token)
          headers: new HttpHeaders({
            'X-Auth-Token': user.token
          })
        });
        return next.handle(modifiedReq)
      })
    );
  }
}
