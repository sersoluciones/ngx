import { ValidationErrors, ValidatorFn, FormGroup, FormControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { readAsArrayBuffer, getFileType } from '../file/read';
import { catchError, delay, map, switchMap } from 'rxjs/operators';
import { hasValue } from '../utils/check';
import { inArray } from '../utils/array';
import { HttpClient } from '@angular/common/http';

export interface BaseValidationModel {
    Model: string;
    Field: string;
    Id?: string | number;
    Value?: any;
}

// @dynamic
/**
 * Validaciones adicionales para Form Control's
 */
export class CustomValidators {

    /**
     * Verifica si los campos proveidos son iguales
     * @param originalPathField Path del campo original
     * @param duplicatePathField Path del campo que deberia ser igual al original
     */
    static match(originalPathField: string, duplicatePathField: string): ValidatorFn {
        const validation = (fg: FormGroup): ValidationErrors | null => {

            const original = fg.get(originalPathField);
            const duplicate = fg.get(duplicatePathField);

            if (original.value === duplicate.value) {
                if (hasValue(duplicate.errors)) {
                    delete duplicate.errors.match;

                    if (hasValue(duplicate.errors)) {
                        duplicate.setErrors(duplicate.errors);
                    } else {
                        duplicate.setErrors(null);
                    }
                } else {
                    duplicate.setErrors(null);
                }

            } else {

                if (hasValue(duplicate.errors)) {
                    duplicate.errors.match = true;
                    duplicate.setErrors(duplicate.errors);
                } else {
                    duplicate.setErrors({
                        match: true
                    });
                }
            }

            return null;
        };

        return validation;
    }

    /**
     * Verifica si el tamaño no excede el tamaño maximo indicado
     * @param size Tamaño en KB, MG ó GB (ejem: 100MB)
     */
    static maxFileSize(size: string): ValidatorFn {
        return (control: FormControl): ValidationErrors | null => {

            const number = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;
            const sizeNumber = size.match(number);
            let multiplier = 1;

            switch (true) {
                case /[. 0-9]+(KB)/i.test(size):
                    multiplier = 1e3;
                    break;

                case /[. 0-9]+(MB)/i.test(size):
                    multiplier = 1e6;
                    break;

                case /[. 0-9]+(GB)/i.test(size):
                    multiplier = 1e9;
                    break;
            }

            if (hasValue(sizeNumber)) {
                const sizeOnBytes = parseFloat(sizeNumber.join('')) * multiplier;

                if (control.value) {

                    if (control.value.size >= sizeOnBytes) {
                        return {
                            maxFileSize: true
                        };
                    }

                    return null;
                }
            } else {
                console.error('maxFileSize validation: Size must have a number');
            }

            return null;
        };
    }

    /**
     * Verifica si el tamaño es mayor el tamaño mínimo indicado
     * @param size Tamaño en KB, MG ó GB (ejem: 100MB)
     */
    static minFileSize(size: string): ValidatorFn {
        return (control: FormControl): ValidationErrors | null => {

            const number = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;
            const sizeNumber = size.match(number);
            let multiplier = 1;

            switch (true) {
                case /[. 0-9]+(KB)/i.test(size):
                    multiplier = 1e3;
                    break;

                case /[. 0-9]+(MB)/i.test(size):
                    multiplier = 1e6;
                    break;

                case /[. 0-9]+(GB)/i.test(size):
                    multiplier = 1e9;
                    break;
            }

            if (hasValue(sizeNumber)) {
                const sizeOnBytes = parseFloat(sizeNumber.join('')) * multiplier;

                if (control.value) {

                    if (control.value.size <= sizeOnBytes) {
                        return {
                            minFileSize: true
                        };
                    }

                    return null;
                }
            } else {
                console.error('minFileSize validation: Size must have a number');
            }

            return null;
        };
    }

    /**
     * Verifica si el archivo tiene una extensión adminitida por medio de su cabecera
     * @param ext Extensiones admitidas
     */
    static requiredFileType(ext: string | string[]): AsyncValidatorFn {
        return (control: FormControl): Observable<ValidationErrors | null> => {

            const file = control.value;

            if (file) {

                if (!Array.isArray(ext)) {
                    ext = [ext];
                }

                const types = ext.map((type) => type.toLowerCase());

                return readAsArrayBuffer(file)
                    .pipe(
                        map((result: ArrayBuffer) => {

                            if (inArray(getFileType(result), types)) {
                                return null;
                            } else {
                                return {
                                    requiredFileType: true
                                };
                            }

                        })
                    );
            }

            return of(null);
        };
    }

    /**
     * Verifica si existe dicho valor en la DB si coincide con el modelo y el nombre de campo
     * @param http
     * @param url
     * @param requestBody propiedad Id opcional para excluir de la busqueda un registro
     */
    static alreadyExist(http: HttpClient, url: string, requestBody: BaseValidationModel): AsyncValidatorFn {
        return (control: FormControl): Observable<ValidationErrors | null> => {

            return of(control.value).pipe(
                delay(1000),
                switchMap((value) => {
                    if (hasValue(value)) {

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

}
