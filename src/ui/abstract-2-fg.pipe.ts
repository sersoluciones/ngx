import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';

@Pipe({
  name: 'abstract2Fg'
})
export class Abstract2FgPipe implements PipeTransform {

  transform(value: AbstractControl, ...args: any[]): UntypedFormGroup {
    return value as UntypedFormGroup;
  }

}
