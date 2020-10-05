import { NgModule } from '@angular/core';
import { WhenScrolledDirective } from './when-scrolled.directive';
import { FinishTypingDirective } from './finish-typing.directive';
import { BgImageDirective } from './bg-image.directive';
import { AngularMultiSelectModule } from 'src/select';

const dependencies = [
  WhenScrolledDirective,
  FinishTypingDirective,
  BgImageDirective
];

@NgModule({
  declarations: [...dependencies],
  exports: [...dependencies]
})
export class SerUiModule {}
