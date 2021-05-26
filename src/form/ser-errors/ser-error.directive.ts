// tslint:disable: no-bitwise
import { Directive, Input, OnInit, OnDestroy, DoCheck, Inject, HostBinding, forwardRef } from '@angular/core';
import { ErrorOptions } from './ser-errors';
import { SerErrorsDirective } from './ser-errors.directive';
import { toArray } from '../../utils/array';
import { combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';

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
        this.states = this._states.asObservable().pipe(distinctUntilChanged());

        const errors = this._serErrors.subject
            .pipe(
                filter(Boolean),
                filter((obj: any) => !!~this.errorNames.indexOf(obj.errorName))
            );

        const states = this.states
            .pipe(map(stats => this.rules.every(rule => !!~stats.indexOf(rule))));

        this.subscription = combineLatest([states, errors])
            .subscribe(([stats, errs]) => {
                this.hidden = !(stats && errs.control.hasError(errs.errorName));
            });

    }

    ngDoCheck() {
        this._states.next(
            this.rules.filter((rule) => (this._serErrors.control as any)[rule])
        );
    }

    ngOnDestroy() {
        if (this.subscription && !this.subscription.closed) {
            this.subscription?.unsubscribe();
        }
    }

}
