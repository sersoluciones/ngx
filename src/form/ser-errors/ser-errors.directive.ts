import { Directive, Input, OnChanges, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroupDirective, AbstractControl } from '@angular/forms';
import { ErrorDetails, ErrorOptions } from './ser-errors';
import { toArray } from '../../utils/array';
import { BehaviorSubject } from 'rxjs';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[serErrors]',
    exportAs: 'serErrors'
})
export class SerErrorsDirective implements OnChanges, OnDestroy, AfterViewInit {

    // tslint:disable-next-line: no-input-rename
    @Input('serErrors')
    controlName: string;

    subject = new BehaviorSubject<ErrorDetails>(null);
    control: AbstractControl;
    ready = false;

    constructor(private _form: FormGroupDirective) { }

    get errors() {
        if (!this.ready) { return; }
        return this.control.errors;
    }

    get hasErrors() {
        return !!this.errors;
    }

    hasError(name: string, conditions: ErrorOptions): boolean {
        return this.checkPropState('invalid', name, conditions);
    }

    isValid(name: string, conditions: ErrorOptions): boolean {
        return this.checkPropState('valid', name, conditions);
    }

    getError(name: string) {
        if (!this.ready) { return; }
        return this.control.getError(name);
    }

    private checkPropState(prop: string, name: string, conditions: ErrorOptions): boolean {

        if (!this.ready) { return; }
        const controlPropsState = (
            !conditions || toArray(conditions).every((condition: string) => this.control[condition])
        );

        if (name.charAt(0) === '*') {
            return this.control[prop] && controlPropsState;
        }

        return (
            prop === 'valid' ? !this.control.hasError(name) : this.control.hasError(name) && controlPropsState
        );
    }

    private checkStatus() {
        const control = this.control;

        if (control === null) {
            throw new Error(`SerErrorsDirective: FormControl not finded: ${this.controlName}`);
        }

        const errors = control.errors;
        this.ready = true;

        if (!errors) {
            return;
        }

        for (const errorName in errors) {
            if (this.errors.hasOwnProperty(errorName)) {
                this.subject.next({ control, errorName });
            }
        }
    }

    ngOnChanges() {
        this.control = this._form.control.get(this.controlName);
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.checkStatus();
            this.control.statusChanges.subscribe(this.checkStatus.bind(this));
        });
    }

    ngOnDestroy() {
        if (!this.subject.closed) {
            this.subject.unsubscribe();
        }
    }

}
