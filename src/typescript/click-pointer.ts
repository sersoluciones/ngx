import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[click]'
})
export class StyleDirective {

  constructor(private el: ElementRef) { }

  @HostBinding('style.cursor') cursor = 'pointer';

}
