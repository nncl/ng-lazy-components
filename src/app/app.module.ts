import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloModule } from "./components/hello/hello.module";
import { DirectivesModule } from "./directives/directives.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HelloModule,
    DirectivesModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
