import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignupService } from 'src/app/services/signup.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private signupService: SignupService) { }

  ngOnInit(): void {
    this.userSub = this.signupService.user.subscribe(user=> {
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.signupService.logout()
  }
}
