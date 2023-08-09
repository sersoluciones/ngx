import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors, Validators } from '@angular/forms';
import { BaseView } from 'src/app/base/base-view';
import * as examples from './examples';
import { Observable, of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';

@Component({
    templateUrl: './basic.component.html'
})
export class BasicComponent extends BaseView {

    examples = examples;

    modelForm = this._fb.group({
        text1: ['', [Validators.required], this.mockAsyncValidator(['existingUser1', 'existingUser2'])],
        text2: ['', [Validators.required]],
        number1: [null, [Validators.required]],
        select1: [null, [Validators.required]]
    });

    mockAsyncValidator(existingValues: string[]): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            const value = control.value;

            return of(value).pipe(
                delay(1000), // Simulando una demora de 1 segundo (puedes ajustar esto)
                map(() => {
                    if (existingValues.includes(value)) {
                        return { alreadyExists: true };
                    }
                    return null;
                }),
                catchError(() => of(null))
            );
        };
    }

}
