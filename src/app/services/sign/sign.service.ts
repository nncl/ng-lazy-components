import { Injectable } from '@angular/core';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from "angularx-social-login";
import { SocialAuthServiceConfig } from "angularx-social-login/socialauth.service";

const config: SocialAuthServiceConfig = {
  autoLogin: false,
  onError(err): void {
    throw err;
  },
  providers: [
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(
        'clientId'
      )
    },
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider('clientId')
    }
  ]
};

@Injectable({
  providedIn: 'root'
})
export class SignService extends SocialAuthService {

  constructor() {
    super(config);
  }

  signInWithGoogle(): void {
    this.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
