import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { VisibilityServiceService } from "../services/visibility-service.service";
import { filter, take } from "rxjs/operators";

@Directive({
  selector: '[appVisibleWith]'
})
export class VisibleWithDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private visibilityService: VisibilityServiceService) { }

  @Input()
  set appVisibleWith(element) {
    this.visibilityService
      .elementInSight(new ElementRef(element))
      .pipe(filter(visible => visible), take(1))
      .subscribe(() => {
        this.viewContainer.createEmbeddedView(this.templateRef);
      });
  }

}
