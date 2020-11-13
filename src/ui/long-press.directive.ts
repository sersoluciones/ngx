// tslint:disable: no-output-on-prefix

import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
    selector: '[longPress]'
})
export class LongPressDirective {

    @Input() pressDuration = 500;

    @Output() onShortPress: EventEmitter<any> = new EventEmitter();
    @Output() onLongPress: EventEmitter<any> = new EventEmitter();
    @Output() onLongPressing: EventEmitter<any> = new EventEmitter();
    @Output() onLongPressEnd: EventEmitter<any> = new EventEmitter();

    private pressing: boolean;
    private longPressing: boolean;
    private timeout: any;
    private mouseX: number;
    private mouseY: number;

    @HostBinding('class.press')
    get press() { return this.pressing; }

    @HostBinding('class.longpress')
    get longPress() { return this.longPressing; }

    @HostListener('mousedown', ['$event'])
    @HostListener('touchstart', ['$event'])
    onMouseDown(event: MouseEvent | TouchEvent) {

        // don't do right/middle clicks
        if (event instanceof MouseEvent && event.button !== 0) { return; }

        if (event instanceof MouseEvent) {
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;
        } else if (event instanceof TouchEvent) {
            this.mouseX = event.touches[0].clientX;
            this.mouseY = event.touches[0].clientY;
        }

        this.pressing = true;
        this.longPressing = false;

        this.timeout = setTimeout(() => {
            this.longPressing = true;
            this.onLongPress.emit(event);
            this.loop(event);
            event.preventDefault();
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

    dismiss() {
        clearTimeout(this.timeout);
        this.longPressing = false;
        this.pressing = false;
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

    @HostListener('mouseup', ['$event'])
    @HostListener('touchend', ['$event'])
    onMouseUp(event: MouseEvent | TouchEvent) {

        // don't do right/middle clicks
        if ((event as MouseEvent).button !== 0) { return; }

        this.endPress();
    }

    @HostListener('mousemove', ['$event'])
    @HostListener('touchmove', ['$event'])
    onMouseMove(event: MouseEvent | TouchEvent) {

        if (this.pressing && !this.longPressing) {
            let xThres = false;
            let yThres = false;

            if (event instanceof MouseEvent) {
                xThres = (event.clientX - this.mouseX) > 10;
                yThres = (event.clientY - this.mouseY) > 10;
            } else if (event instanceof TouchEvent) {
                xThres = (event.touches[0].clientX - this.mouseX) > 10;
                yThres = (event.touches[0].clientY - this.mouseY) > 10;
            }

            if (xThres || yThres) {
                this.dismiss();
            }
        }
    }

}
