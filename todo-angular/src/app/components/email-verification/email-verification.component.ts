import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('userData'));

  constructor() { }

  ngOnInit(): void {
    Swal.fire({
      title: 'Please Verify your email address.',
      text: `A verification email has been sent to ${this.user.email}`,
      icon: 'warning',
      width: 600,
      padding: '3em',
      backdrop: `
        rgba(63,114,155,0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `
    })
  }

}
