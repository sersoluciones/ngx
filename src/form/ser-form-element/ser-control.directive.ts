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
    valid = false;
    invalid = false;
    pending = false;
    hasValue = false;
    observer: Subscription;
    observerState: Subscription;

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
    }

    onChangeState() {
        this.dirty = this._ngControl?.control?.dirty;
        this.valid = this._ngControl?.control?.valid;
        this.invalid = this._ngControl?.control?.invalid;
        this.pending = this._ngControl?.control?.pending;
        this.disabled = this._ngControl?.control?.disabled;
    }

    ngOnInit() {
        this.onChangeValue(this._ngControl?.control?.value);

        this.observer = this._ngControl?.control?.valueChanges
            .subscribe(value => this.onChangeValue(value));

        this.observerState = this._ngControl?.control?.statusChanges
            .subscribe(() => this.onChangeState());
    }

    ngOnDestroy() {
        this.observer?.unsubscribe();
        this.observerState?.unsubscribe();
    }

}
