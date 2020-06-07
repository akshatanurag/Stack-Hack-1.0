import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { SignupService } from 'src/app/services/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  error: any = null;
  errorMsg: string = null;
  signupForm: FormGroup;
  submitBtnDisabled = false;

  constructor(private signupService: SignupService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[a-zA-Z0-9@$!%*?&]+$')]),
      passwordCnf: new FormControl(null, Validators.required)
    }, {
      validators: this.mustMatch
    });
  }

  mustMatch(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('passwordCnf').value) {
      c.get('passwordCnf').setErrors({ invalid: true })
      return { invalid: true };
    }
  }


  onSubmit() {
    if (this.signupForm.status === 'INVALID') {
      console.error('INVALID FORM');
      return;
    }
    // this.signupForm.reset();
    this.submitBtnDisabled=true
    this.error = null;
    this.signupService.signup(this.signupForm.value)
    .subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/']);
      },
      err => {
        this.submitBtnDisabled = false;
        this.error = err.error;
        if (err.status===400) {
          this.errorMsg = 'Email already registered';
        }
      }
    );
  }
}
