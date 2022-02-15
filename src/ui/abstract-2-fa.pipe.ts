import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormArray } from '@angular/forms';

@Pipe({
  name: 'abstract2Fa'
})
export class Abstract2FaPipe implements PipeTransform {

    transform(value: AbstractControl[] | AbstractControl, ...args: any[]): FormArray {
      return value as FormArray;
    }

}
