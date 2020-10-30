import { ElementRef, OnDestroy, EventEmitter, Renderer2 } from '@angular/core';
export declare class WhenScrolledDirective implements OnDestroy {
    private _elementRef;
    callback: EventEmitter<any>;
    listener: any;
    constructor(_elementRef: ElementRef, rendered: Renderer2);
    ngOnDestroy(): void;
}
