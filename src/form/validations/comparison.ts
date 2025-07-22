import { AbstractControl, UntypedFormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { hasValueLegacy, objHasValue } from '../../utils/check';
import { getDate } from '../../utils/date';


function clearError(target: AbstractControl, name: string) {
    if (objHasValue(target.errors)) {
        delete target.errors[name];

        if (objHasValue(target.errors)) {
            target.setErrors(target.errors);
        } else {
            target.setErrors(null);
        }
    } else {
        target.setErrors(null);
    }
}

function setError(target: AbstractControl, name: string) {
    if (objHasValue(target.errors)) {
        target.errors[name] = true;
        target.setErrors(target.errors);
    } else {
        const obj = {};
        obj[name] = true;
        target.setErrors(obj);
    }
}

export function lowerThan(TargetPathField: string, GreaterPathField: string): ValidatorFn {
    return (fg: UntypedFormGroup): ValidationErrors | null => {

        const greater = fg.get(GreaterPathField);
        const target = fg.get(TargetPathField);

        if (!hasValueLegacy(greater.value) || !hasValueLegacy(target.value)) {
            clearError(target, 'lowerThan');
            return null;
        }

        if (greater.value > target.value) {
            clearError(target, 'lowerThan');
        } else {
            setError(target, 'lowerThan');
        }

        return null;
    };

}

export function lowerOrEqualThan(TargetPathField: string, LowerPathField: string): ValidatorFn {
    return (fg: UntypedFormGroup): ValidationErrors | null => {

        const lower = fg.get(LowerPathField);
        const target = fg.get(TargetPathField);

        if (!hasValueLegacy(lower.value) || !hasValueLegacy(target.value)) {
            clearError(target, 'lowerOrEqualThan');
            return null;
        }

        if (lower.value >= target.value) {
            clearError(target, 'lowerOrEqualThan');
        } else {
            setError(target, 'lowerOrEqualThan');
        }

        return null;
    };
}

export function greaterThan(TargetPathField: string, LowerPathField: string): ValidatorFn {
    return (fg: UntypedFormGroup): ValidationErrors | null => {

        const lower = fg.get(LowerPathField);
        const target = fg.get(TargetPathField);

        if (!hasValueLegacy(lower.value) || !hasValueLegacy(target.value)) {
            clearError(target, 'greaterThan');
            return null;
        }

        if (lower.value < target.value) {
            clearError(target, 'greaterThan');
        } else {
            setError(target, 'greaterThan');
        }

        return null;
    };
}

export function greaterOrEqualThan(TargetPathField: string, LowerPathField: string): ValidatorFn {
    return (fg: UntypedFormGroup): ValidationErrors | null => {

        const lower = fg.get(LowerPathField);
        const target = fg.get(TargetPathField);

        if (!hasValueLegacy(lower.value) || !hasValueLegacy(target.value)) {
            clearError(target, 'greaterOrEqualThan');
            return null;
        }

        if (lower.value <= target.value) {
            clearError(target, 'greaterOrEqualThan');
        } else {
            setError(target, 'greaterOrEqualThan');
        }

        return null;
    };
}

export function betweenRange(TargetPathField: string, LowerPathField: string, GreaterPathField: string): ValidatorFn {
    return (fg: UntypedFormGroup): ValidationErrors | null => {

        const target = fg.get(TargetPathField);
        const lower = fg.get(LowerPathField);
        const greater = fg.get(GreaterPathField);

        if (!hasValueLegacy(lower.value) || !hasValueLegacy(greater.value) || !hasValueLegacy(target.value)) {
            clearError(target, 'betweenRange');
            return null;
        }

        if (target.value >= lower.value && target.value <= greater.value) {
            clearError(target, 'betweenRange');
        } else {
            setError(target, 'betweenRange');
        }

        return null;
    };
}

export function dateLowerThan(TargetPathField: string, GreaterPathField: string): ValidatorFn {
    return (fg: AbstractControl): ValidationErrors | null => {

        const greater = fg.get(GreaterPathField);
        const target = fg.get(TargetPathField);

        if (!hasValueLegacy(greater?.value) || !hasValueLegacy(target?.value)) {
            clearError(target!, 'dateLowerThan');
            return null;
        }

        let greaterValue = getDate(greater?.value);
        let targetValue = getDate(target?.value);

        if (greaterValue > targetValue) {
            clearError(target!, 'dateLowerThan');
        } else {
            setError(target!, 'dateLowerThan');
        }

        return null;
    };

}

export function dateGreaterThan(TargetPathField: string, LowerPathField: string): ValidatorFn {
    return (fg: AbstractControl): ValidationErrors | null => {

        const lower = fg.get(LowerPathField);
        const target = fg.get(TargetPathField);

        if (!hasValueLegacy(lower?.value) || !hasValueLegacy(target?.value)) {
            clearError(target!, 'greaterThan');
            return null;
        }

        let lowerValue = getDate(lower?.value);
        let targetValue = getDate(target?.value);

        if (lowerValue < targetValue) {
            clearError(target!, 'dateGreaterThan');
        } else {
            setError(target!, 'dateGreaterThan');
        }

        return null;
    };
}
