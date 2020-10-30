import { OnInit, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
export declare class SerControlDirective implements OnInit, OnDestroy {
    private _ngControl;
    disabled: boolean;
    focus: boolean;
    dirty: boolean;
    valid: boolean;
    invalid: boolean;
    pending: boolean;
    hasValue: boolean;
    observer: Subscription;
    constructor(_ngControl: NgControl);
    onFocus(): void;
    onBlur(): void;
    onChangeValue(value: any): void;
    ngOnInit(): void;
    ngOnDestroy(): void;
}
