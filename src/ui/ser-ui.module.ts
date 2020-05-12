import { NgModule } from '@angular/core';
import { WhenScrolledDirective } from './when-scrolled.directive';
import { FinishTypingDirective } from './finish-typing.directive';

const dependencies = [
  WhenScrolledDirective,
  FinishTypingDirective
];

@NgModule({
  declarations: [...dependencies],
  exports: [...dependencies]
})
export class SerUiModule {}
