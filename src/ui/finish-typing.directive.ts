import { Directive, Output, EventEmitter, ElementRef, Renderer2, OnDestroy } from '@angular/core';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[finishTyping]'
})
export class FinishTypingDirective implements OnDestroy {

    @Output() callback: EventEmitter<any> = new EventEmitter();
    listener: any;
    inputChangedPromise: ReturnType<typeof setTimeout>;

    constructor(private _elementRef: ElementRef, rendered: Renderer2) {
        this.listener = rendered.listen(this._elementRef.nativeElement, 'keyup', () => {

            if (this.inputChangedPromise) {
                clearTimeout(this.inputChangedPromise);
            }

            this.inputChangedPromise = setTimeout(() => {
                this.callback.emit();
            }, 500);
        });
    }

    ngOnDestroy() {
        this.listener();
    }

}
