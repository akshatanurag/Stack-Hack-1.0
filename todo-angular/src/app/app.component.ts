import { Component, OnInit } from '@angular/core';
import { SignupService } from './services/signup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'todo';

  constructor(private authService: SignupService) { }

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
