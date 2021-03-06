import { Directive, ElementRef, OnDestroy, Output, EventEmitter, Renderer2, Input } from '@angular/core';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[whenScrolled]'
})
export class WhenScrolledDirective implements OnDestroy {

    @Input() whenScrolledGap = 0;
    @Output() callback: EventEmitter<any> = new EventEmitter();
    @Output() whenScrolled: EventEmitter<any> = new EventEmitter();
    listener: any;

    constructor(private _elementRef: ElementRef, rendered: Renderer2) {
        this.listener = rendered.listen(this._elementRef.nativeElement, 'scroll', (ev: any) => {
            if (Math.round(ev.target.scrollTop + ev.target.clientHeight) >= ev.target.scrollHeight - this.whenScrolledGap) {
                this.callback.emit();
                this.whenScrolled.emit(ev);
            }
        });
    }

    ngOnDestroy() {
        this.listener();
    }

}
