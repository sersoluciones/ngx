import { HttpClient } from '@angular/common/http';
import { AsyncValidatorFn, UntypedFormControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, switchMap } from 'rxjs/operators';
import { hasValueLegacy } from '../../utils/check';

export interface BaseValidationModel {
    Model: string;
    Field: string;
    Id?: string | number;
    Value?: any;
}

export function alreadyExist(http: HttpClient, url: string, requestBody: BaseValidationModel): AsyncValidatorFn {
    return (control: UntypedFormControl): Observable<ValidationErrors | null> => {

        return of(control.value).pipe(
            delay(1000),
            switchMap((value) => {
                if (hasValueLegacy(value)) {

                    requestBody.Value = value;

                    return http.post(url, requestBody).pipe(
                      map(() => ({ alreadyExist: true })),
                      catchError(() => of(null))
                    );
                }

                return of(null);
            }
        ));
    };
}
