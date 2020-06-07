import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { SignupService } from 'src/app/services/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  error: any = null;
  errorMsg: string = null;
  signinForm: FormGroup;
  submitBtnDisabled = false;

  constructor(private signupService: SignupService, private router: Router) { }

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.signinForm.status === 'INVALID') {
      console.error('INVALID FORM');
      return;
    }
    this.error = null;
    this.submitBtnDisabled = true;
    this.signupService.signin(this.signinForm.value)
      .subscribe(
        res => {
          this.router.navigate(['/']);
        },
        err => {
          this.error = err.error;
          this.errorMsg = 'Invalid login credentials';
          this.submitBtnDisabled = false;
          /* if (this.error.message==="INVALID_PASSWORD") {
            this.errorMsg = 'Invalid Password'
          }
          if (this.error.message==="EMAIL_NOT_FOUND") {
            this.errorMsg = 'This email is not registered'
          } */
        }
      );
  }
}
