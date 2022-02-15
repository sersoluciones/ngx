import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Pipe({
  name: 'abstract2Fg'
})
export class Abstract2FgPipe implements PipeTransform {

  transform(value: AbstractControl, ...args: any[]): FormGroup {
    return value as FormGroup;
  }

}
