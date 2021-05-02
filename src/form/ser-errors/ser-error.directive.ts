// tslint:disable: no-bitwise
import { Directive, Input, OnInit, OnDestroy, DoCheck, Inject, HostBinding, forwardRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/combineLatest';
import { ErrorOptions } from './ser-errors';
import { SerErrorsDirective } from './ser-errors.directive';
import { toArray } from '../../utils/array';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[serError]'
})
export class SerErrorDirective implements OnInit, OnDestroy, DoCheck {

    @Input() set serError(value: ErrorOptions) {
        this.errorNames = toArray(value);
    }

    @Input() set when(value: ErrorOptions) {
        this.rules = toArray(value);
    }

    @HostBinding('hidden')
    hidden = true;

    rules: string[] = [];
    errorNames: string[] = [];
    subscription: Subscription;
    _states: Subject<string[]>;
    states: Observable<string[]>;

    constructor(@Inject(forwardRef(() => SerErrorsDirective)) private _serErrors: SerErrorsDirective) { }

    ngOnInit() {

        this._states = new Subject<string[]>();
        this.states = this._states.asObservable().distinctUntilChanged();

        const errors = this._serErrors.subject
            .filter(Boolean)
            .filter((obj: any) => !!~this.errorNames.indexOf(obj.errorName));

        const states = this.states
            .map(states => this.rules.every(rule => !!~states.indexOf(rule)));

        this.subscription = Observable.combineLatest([states, errors])
            .subscribe(([states, errors]) => {
                this.hidden = !(states && errors.control.hasError(errors.errorName));
            });

    }

    ngDoCheck() {
        this._states.next(
            this.rules.filter((rule) => (this._serErrors.control as any)[rule])
        );
    }

    ngOnDestroy() {
        if (!this.subscription.closed) {
            this.subscription.unsubscribe();
        }
    }

}
