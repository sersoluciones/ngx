
import { NgModule } from '@angular/core';
import { WhenScrolledDirective } from './when-scrolled.directive';

const dependencies = [
  WhenScrolledDirective
];

@NgModule({
  declarations: [...dependencies],
  exports: [...dependencies]
})
export class SerUiModule {}
