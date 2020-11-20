import { Directive, HostListener, OnInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[growOnInput]'
})
export class GrowOnInputDirective implements OnInit, OnDestroy {
    listener;

    constructor(private _elementRef: ElementRef, private _renderer: Renderer2) { }

    getScrollHeight(elm: any) {
        const savedValue = elm.value;
        elm.value = '';
        elm._baseScrollHeight = elm.scrollHeight;
        elm.value = savedValue;
    }

    ngOnInit() {
        this.listener = this._renderer?.listen(this._elementRef.nativeElement, 'keyup', () => {

            if (this._elementRef.nativeElement.nodeName !== 'TEXTAREA') {
                return;
            }

            const rows = Math.ceil(this._elementRef.nativeElement.scrollHeight / 16);
            this._elementRef.nativeElement.rows = 1 + rows;

        });
    }

    ngOnDestroy() {
        this.listener();
    }

}
