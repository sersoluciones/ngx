import { ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';
import { hasValue } from '../utils/check';

export class CustomValidators {

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

}
