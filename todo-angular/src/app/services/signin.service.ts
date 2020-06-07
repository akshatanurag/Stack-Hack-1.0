/* import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { User } from '../models/User.model';
import { tap } from 'rxjs/operators';

interface AuthResponseData {
  displayName: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered: boolean
}

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  user = new Subject<User>();

  constructor(private http: HttpClient) { }

  signin({email, password}) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA760rVlSovzYOMCd3Zk37lFYxs0z9GqVc', {
      email,
      password,
      returnSecureToken: true
    })
    .pipe(tap(res=> {
      // console.log(res);
      this.user.next(new User(res.displayName, res.email, res.localId, res.idToken, new Date(Date.now() + +res.expiresIn*1000)))
    }))
  }
}
 */