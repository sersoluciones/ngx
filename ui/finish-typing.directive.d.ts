import { EventEmitter, ElementRef, Renderer2, OnDestroy } from '@angular/core';
export declare class FinishTypingDirective implements OnDestroy {
    private _elementRef;
    callback: EventEmitter<any>;
    listener: any;
    inputChangedPromise: ReturnType<typeof setTimeout>;
    constructor(_elementRef: ElementRef, rendered: Renderer2);
    ngOnDestroy(): void;
}
