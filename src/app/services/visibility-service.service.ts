import { ElementRef, Inject, Injectable } from '@angular/core';
import { combineLatest, concat, defer, fromEvent, Observable, of } from "rxjs";
import { DOCUMENT } from "@angular/common";
import { distinctUntilChanged, flatMap, map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class VisibilityServiceService {
  private pageVisible$: Observable<boolean>;

  constructor(@Inject(DOCUMENT) document: any) {
    this.pageVisible$ = concat(
      defer(() => of(!document.hidden)),
      fromEvent(document, 'visibilitychange')
        .pipe(
          map(e => !document.hidden)
        )
    );
  }

  elementInSight(element: ElementRef): Observable<any> {

    const elementVisible$ = Observable.create(observer => {
      const intersectionObserver = new IntersectionObserver(entries => {
        observer.next(entries);
      });

      intersectionObserver.observe(element.nativeElement);

      return () => {
        intersectionObserver.disconnect();
      };

    })
      .pipe(
        flatMap(entries => entries),
        map(entry => entry.isIntersecting),
        distinctUntilChanged()
      );

    const elementInSight$ = combineLatest(
      this.pageVisible$,
      elementVisible$,
      (pageVisible, elementVisible) => pageVisible && elementVisible
    )
      .pipe(
        distinctUntilChanged()
      );

    return elementInSight$;
  }
}
