import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { LazyLoaderService } from "./services/lazy-loader/lazy-loader.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  @ViewChild('container', { read: ViewContainerRef, static: false }) container: ViewContainerRef;

  constructor(
    private loader: LazyLoaderService
  ) {
  }

  load(): void {
    this.container.clear();
    setTimeout(() => this.loader.load('map-component', this.container), 500);
  }
}
