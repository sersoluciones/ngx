import { AbstractControl, UntypedFormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { hasValueLegacy } from '../../utils/check';

export function match(originalPathField: string, duplicatePathField: string): ValidatorFn {
    const validation = (fg: UntypedFormGroup): ValidationErrors | null => {

        const original = fg.get(originalPathField);
        const duplicate = fg.get(duplicatePathField);

        if (original.value === duplicate.value) {
            if (hasValueLegacy(duplicate.errors)) {
                delete duplicate.errors.match;

                if (hasValueLegacy(duplicate.errors)) {
                    duplicate.setErrors(duplicate.errors);
                } else {
                    duplicate.setErrors(null);
                }
            } else {
                duplicate.setErrors(null);
            }

        } else {

            if (hasValueLegacy(duplicate.errors)) {
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

export function verifyNIT(control: AbstractControl): { [key: string]: any } | null {

    if (!hasValueLegacy(control.value)) {
        return null;
    }

    if (!(/^([0-9]*)([-])([0-9]{1,1})$/).test(control.value)) {
        return { 'verifyNIT': true };
    }

    const values = control.value.split(/[-]+/);

    if (values.length > 2) {
        return { 'verifyNIT': true };
    }

    if (hasValueLegacy(values[0])) {

        let v = 41 * values[0][0];
        v += 37 * values[0][1];
        v += 29 * values[0][2];
        v += 23 * values[0][3];
        v += 19 * values[0][4];
        v += 17 * values[0][5];
        v += 13 * values[0][6];
        v += 7 * values[0][7];
        v += 3 * values[0][8];
        v = v % 11;

        if (v >= 2) {
            v = 11 - v;
        }

        if (parseInt(values[1], 10) === v) {
            return null;
        } else if (hasValueLegacy(values[1])) {
            return { 'verifyNITIntegrity': true };
        }

    }

}
