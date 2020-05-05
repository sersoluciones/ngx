
import { NgModule } from '@angular/core';
import { SerFormElementComponent } from './ser-form-element/ser-form-element.component';
import { SerControlDirective } from './ser-form-element/ser-control.directive';
import { SerErrorDirective } from './ser-errors/ser-error.directive';
import { SerErrorsDirective } from './ser-errors/ser-errors.directive';

const dependencies = [
  SerFormElementComponent,
  SerControlDirective,
  SerErrorsDirective,
  SerErrorDirective
];

@NgModule({
  declarations: [...dependencies],
  exports: [...dependencies]
})
export class SerFormModule {}
