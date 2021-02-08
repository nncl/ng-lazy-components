import { Component, OnInit } from '@angular/core';
import { SignService } from "../../services/sign/sign.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: [ './signin.component.scss' ]
})
export class SigninComponent implements OnInit {

  constructor(private signService: SignService) {
  }

  ngOnInit(): void {
  }

  sign(provider: 'google' | 'facebook'): void {
    if (provider === 'google') {
      this.signService.signInWithGoogle();
    } else {
      this.signService.signInWithFB();
    }
  }

}
