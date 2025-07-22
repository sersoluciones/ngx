import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, UntypedFormControl } from '@angular/forms';

@Pipe({
  name: 'abstract2Fc'
})
export class Abstract2FcLegacyPipe implements PipeTransform {

  transform(value: AbstractControl, ...args: any[]): UntypedFormControl {
    return value as UntypedFormControl;
  }

}
