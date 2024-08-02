import { Directive, OnInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[growOnInput]'
})
export class GrowOnInputDirective implements OnInit, OnDestroy {
    listener;

    constructor(private _elementRef: ElementRef, private _renderer: Renderer2) { }

    ngOnInit() {

        this._renderer.setAttribute(this._elementRef.nativeElement, "style", "min-height:" + (this._elementRef.nativeElement.scrollHeight) + "px;overflow-y:hidden;");

        this.listener = this._renderer?.listen(this._elementRef.nativeElement, 'input', () => {
            this._renderer.setAttribute(this._elementRef.nativeElement, "style", "min-height:" + (this._elementRef.nativeElement.scrollHeight) + "px;overflow-y:hidden;");
        });
    }

    ngOnDestroy() {
        this.listener();
    }

}
