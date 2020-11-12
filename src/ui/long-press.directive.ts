// tslint:disable: no-output-on-prefix

import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
    selector: '[longPress]'
})
export class LongPressDirective {

    @Input() pressDuration = 700;

    @Output() onShortPress: EventEmitter<any> = new EventEmitter();
    @Output() onLongPress: EventEmitter<any> = new EventEmitter();
    @Output() onLongPressing: EventEmitter<any> = new EventEmitter();
    @Output() onLongPressEnd: EventEmitter<any> = new EventEmitter();

    private pressing: boolean;
    private longPressing: boolean;
    private timeout: any;

    @HostBinding('class.press')
    get press() { return this.pressing; }

    @HostBinding('class.longpress')
    get longPress() { return this.longPressing; }

    @HostListener('mousedown', ['$event'])
    @HostListener('touchstart', ['$event'])
    onMouseDown(event: MouseEvent | TouchEvent) {

        // don't do right/middle clicks
        if (event instanceof MouseEvent && event.button !== 0) { return; }

        this.pressing = true;
        this.longPressing = false;

        this.timeout = setTimeout(() => {
            this.longPressing = true;
            this.onLongPress.emit(event);
            this.loop(event);
        }, this.pressDuration);

        this.loop(event);
    }

    loop(event) {
        if (this.longPressing) {
            this.timeout = setTimeout(() => {
                this.onLongPressing.emit(event);
                this.loop(event);
            }, 50);
        }
    }

    endPress() {
        clearTimeout(this.timeout);

        if (!this.longPressing) {
            this.onShortPress.emit();
        }

        this.longPressing = false;
        this.pressing = false;
        this.onLongPressEnd.emit(true);
    }

    @HostListener('mouseup')
    @HostListener('touchend')
    onMouseUp() { this.endPress(); }

}
