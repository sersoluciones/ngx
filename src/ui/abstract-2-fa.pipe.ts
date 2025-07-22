import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, UntypedFormArray } from '@angular/forms';

@Pipe({
  name: 'abstract2Fa'
})
export class Abstract2FaLegacyPipe implements PipeTransform {

    transform(value: AbstractControl[] | AbstractControl, ...args: any[]): UntypedFormArray {
      return value as UntypedFormArray;
    }

}
