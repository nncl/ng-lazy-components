import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloModule } from "./components/hello/hello.module";
import { DirectivesModule } from "./directives/directives.module";
import { LazyLoaderService } from "./services/lazy-loader/lazy-loader.service";
import { lazyArrayToObj } from "./services/lazy-loader/lazy-widgets";
import { LAZY_WIDGETS } from "./services/lazy-loader/tokens";
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule
} from "angularx-social-login";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HelloModule,
    DirectivesModule,

    SocialLoginModule
  ],
  providers: [
    { provide: LAZY_WIDGETS, useFactory: lazyArrayToObj },
    LazyLoaderService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
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
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {
}
