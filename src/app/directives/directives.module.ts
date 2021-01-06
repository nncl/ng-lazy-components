import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisibleWithDirective } from "./visible-with.directive";


@NgModule({
  declarations: [ VisibleWithDirective ],
  imports: [
    CommonModule
  ],
  exports: [ VisibleWithDirective ]
})
export class DirectivesModule {
}
