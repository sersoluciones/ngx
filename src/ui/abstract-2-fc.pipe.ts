import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Pipe({
  name: 'abstract2Fc'
})
export class Abstract2FcPipe implements PipeTransform {

  transform(value: AbstractControl, ...args: any[]): FormControl {
    return value as FormControl;
  }

}
