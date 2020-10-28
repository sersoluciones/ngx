import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { hasValue } from '../../utils/check';

export function lowerThan(BasePathField: string, TargetPathField: string): ValidatorFn {
    return (fg: FormGroup): ValidationErrors | null => {

        const base = fg.get(BasePathField);
        const target = fg.get(TargetPathField);

        if (base.value < target.value) {
            if (hasValue(target.errors)) {
                delete base.errors.lowerThan;

                if (hasValue(base.errors)) {
                    base.setErrors(base.errors);
                } else {
                    base.setErrors(null);
                }
            } else {
                base.setErrors(null);
            }

        } else {

            if (hasValue(base.errors)) {
                base.errors.lowerThan = true;
                base.setErrors(base.errors);
            } else {
                base.setErrors({
                    lowerThan: true
                });
            }
        }

        return null;
    };

}

export function lowerOrEqualThan(BasePathField: string, TargetPathField: string): ValidatorFn {
    return (fg: FormGroup): ValidationErrors | null => {

        const base = fg.get(BasePathField);
        const target = fg.get(TargetPathField);

        if (base.value <= target.value) {
            if (hasValue(target.errors)) {
                delete base.errors.lowerOrEqualThan;

                if (hasValue(base.errors)) {
                    base.setErrors(base.errors);
                } else {
                    base.setErrors(null);
                }
            } else {
                base.setErrors(null);
            }

        } else {

            if (hasValue(base.errors)) {
                base.errors.lowerOrEqualThan = true;
                base.setErrors(base.errors);
            } else {
                base.setErrors({
                    lowerOrEqualThan: true
                });
            }
        }

        return null;
    };
}

export function greaterThan(BasePathField: string, TargetPathField: string): ValidatorFn {
    return (fg: FormGroup): ValidationErrors | null => {

        const base = fg.get(BasePathField);
        const target = fg.get(TargetPathField);

        if (base.value > target.value) {
            if (hasValue(target.errors)) {
                delete base.errors.greaterThan;

                if (hasValue(base.errors)) {
                    base.setErrors(base.errors);
                } else {
                    base.setErrors(null);
                }
            } else {
                base.setErrors(null);
            }

        } else {

            if (hasValue(base.errors)) {
                base.errors.greaterThan = true;
                base.setErrors(base.errors);
            } else {
                base.setErrors({
                    greaterThan: true
                });
            }
        }

        return null;
    };
}

export function greaterOrEqualThan(BasePathField: string, TargetPathField: string): ValidatorFn {
    return (fg: FormGroup): ValidationErrors | null => {

        const base = fg.get(BasePathField);
        const target = fg.get(TargetPathField);

        if (base.value >= target.value) {
            if (hasValue(target.errors)) {
                delete base.errors.greaterOrEqualThan;

                if (hasValue(base.errors)) {
                    base.setErrors(base.errors);
                } else {
                    base.setErrors(null);
                }
            } else {
                base.setErrors(null);
            }

        } else {

            if (hasValue(base.errors)) {
                base.errors.greaterOrEqualThan = true;
                base.setErrors(base.errors);
            } else {
                base.setErrors({
                    greaterOrEqualThan: true
                });
            }
        }

        return null;
    };
}
