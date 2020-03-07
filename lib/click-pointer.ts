import { Directive, ElementRef, HostBinding } from '@angular/core';

/**
 * @description
 * Directiva para insertar la propiedad CSS cursor: pointer a todos los elementos que tengan el atributo (click)
 */
@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[click]'
})
export class ClickCursorPointerDirective {

  constructor(private el: ElementRef) { }

  @HostBinding('style.cursor') cursor = 'pointer';

}
