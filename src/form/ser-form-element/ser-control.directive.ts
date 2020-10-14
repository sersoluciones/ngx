import { Directive, HostListener, OnInit, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { hasValue } from '../../utils/check';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[serControl]'
})
export class SerControlDirective implements OnInit, OnDestroy {
    disabled = false;
    focus = false;
    dirty = false;
    invalid = false;
    hasValue = false;
    observer: Subscription;

    constructor(private _ngControl: NgControl) { }

    @HostListener('focus')
    onFocus() {
        this.focus = true;
    }

    @HostListener('blur')
    onBlur() {
        this.focus = false;
    }

    onChangeValue(value: any) {
        this.hasValue = hasValue(value);
        this.invalid = this._ngControl.control.invalid;
        this.dirty = this._ngControl.control.dirty;
        this.disabled = this._ngControl.control.disabled;
    }

    ngOnInit(): void {
        this.onChangeValue(this._ngControl.control.value);

        this.observer = this._ngControl.control.valueChanges.subscribe((value: any) => {
            this.onChangeValue(value);
        });
    }

    ngOnDestroy(): void {
        this.observer.unsubscribe();
    }

}
