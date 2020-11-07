import { Directive, HostListener, Renderer2, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[toggleClass]'
})
export class ToggleClassDirective {

    @Input() toggleClass: string;

    @HostListener('click') onClick() {
        (this.el.nativeElement as HTMLElement).classList.toggle(this.toggleClass);
    }

    constructor(private el: ElementRef, private renderer: Renderer2) {

    }

}
