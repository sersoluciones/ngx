import { OnInit, OnDestroy, DoCheck } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/combineLatest';
import { ErrorOptions } from './ser-errors';
import { SerErrorsDirective } from './ser-errors.directive';
export declare class SerErrorDirective implements OnInit, OnDestroy, DoCheck {
    private _serErrors;
    set serError(value: ErrorOptions);
    set when(value: ErrorOptions);
    hidden: boolean;
    rules: string[];
    errorNames: string[];
    subscription: Subscription;
    _states: Subject<string[]>;
    states: Observable<string[]>;
    constructor(_serErrors: SerErrorsDirective);
    ngOnInit(): void;
    ngDoCheck(): void;
    ngOnDestroy(): void;
}
