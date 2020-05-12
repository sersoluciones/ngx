import { Directive, ElementRef, OnDestroy, Output, EventEmitter, Renderer2 } from '@angular/core';

@Directive({
  selector: '[whenScrolled]'
})
export class WhenScrolledDirective implements OnDestroy {

  @Output() callback: EventEmitter<any> = new EventEmitter();
  listener: any;

  constructor(private _elementRef: ElementRef, rendered: Renderer2) {
    this.listener = rendered.listen(this._elementRef.nativeElement, 'scroll', (ev: any) => {
      if (ev.target.scrollTop + ev.target.offsetHeight >= ev.target.scrollHeight) {
        this.callback.emit();
      }
    });
  }

  ngOnDestroy() {
    this.listener();
  }

}
