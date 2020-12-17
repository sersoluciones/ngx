import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { hasValue } from '../../utils/check';

function clearError(target: AbstractControl, name: string) {
    if (hasValue(target.errors)) {
        delete target.errors[name];

        if (hasValue(target.errors)) {
            target.setErrors(target.errors);
        } else {
            target.setErrors(null);
        }
    } else {
        console.log('entra');
        target.setErrors(null);
    }
}

function setError(target: AbstractControl, name: string) {
    if (hasValue(target.errors)) {
        target.errors[name] = true;
        target.setErrors(target.errors);
    } else {
        const obj = {};
        obj[name] = true;
        target.setErrors(obj);
    }
}

export function lowerThan(TargetPathField: string, LowerPathField: string): ValidatorFn {
    return (fg: FormGroup): ValidationErrors | null => {

        const lower = fg.get(LowerPathField);
        const target = fg.get(TargetPathField);

        if (!hasValue(lower.value) || !hasValue(target.value)) {
            clearError(target, 'lowerThan');
            return null;
        }

        if (lower.value > target.value) {
            clearError(target, 'lowerThan');
        } else {
            setError(target, 'lowerThan');
        }

        return null;
    };

}

export function lowerOrEqualThan(TargetPathField: string, LowerPathField: string): ValidatorFn {
    return (fg: FormGroup): ValidationErrors | null => {

        const lower = fg.get(LowerPathField);
        const target = fg.get(TargetPathField);

        if (!hasValue(lower.value) || !hasValue(target.value)) {
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

export function greaterThan(TargetPathField: string, GreaterPathField: string): ValidatorFn {
    return (fg: FormGroup): ValidationErrors | null => {

        const greater = fg.get(GreaterPathField);
        const target = fg.get(TargetPathField);

        if (!hasValue(greater.value) || !hasValue(target.value)) {
            clearError(target, 'greaterThan');
            return null;
        }

        if (greater.value < target.value) {
            clearError(target, 'greaterThan');
        } else {
            setError(target, 'greaterThan');
        }

        return null;
    };
}

export function greaterOrEqualThan(TargetPathField: string, GreaterPathField: string): ValidatorFn {
    return (fg: FormGroup): ValidationErrors | null => {

        const greater = fg.get(GreaterPathField);
        const target = fg.get(TargetPathField);

        if (!hasValue(greater.value) || !hasValue(target.value)) {
            clearError(target, 'greaterOrEqualThan');
            return null;
        }

        if (greater.value <= target.value) {
            clearError(target, 'greaterOrEqualThan');
        } else {
            setError(target, 'greaterOrEqualThan');
        }

        return null;
    };
}

export function betweenRange(TargetPathField: string, LowerPathField: string, GreaterPathField: string): ValidatorFn {
    return (fg: FormGroup): ValidationErrors | null => {

        const target = fg.get(TargetPathField);
        const lower = fg.get(LowerPathField);
        const greater = fg.get(GreaterPathField);

        if (!hasValue(lower.value) || !hasValue(greater.value) || !hasValue(target.value)) {
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
