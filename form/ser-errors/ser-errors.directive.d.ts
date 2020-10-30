import { OnChanges, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroupDirective, AbstractControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ErrorDetails, ErrorOptions } from './ser-errors';
export declare class SerErrorsDirective implements OnChanges, OnDestroy, AfterViewInit {
    private _form;
    controlName: string;
    subject: BehaviorSubject<ErrorDetails>;
    control: AbstractControl;
    ready: boolean;
    constructor(_form: FormGroupDirective);
    get errors(): import("@angular/forms").ValidationErrors;
    get hasErrors(): boolean;
    hasError(name: string, conditions: ErrorOptions): boolean;
    isValid(name: string, conditions: ErrorOptions): boolean;
    getError(name: string): any;
    private checkPropState;
    private checkStatus;
    ngOnChanges(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
