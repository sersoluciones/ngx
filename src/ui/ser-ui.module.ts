import { NgModule } from '@angular/core';
import { WhenScrolledDirective } from './when-scrolled.directive';
import { FinishTypingDirective } from './finish-typing.directive';
import { BgImageDirective } from './bg-image.directive';
import { CopyToClipboardDirective } from './copy-to-clipboard.directive';

const dependencies = [
  WhenScrolledDirective,
  FinishTypingDirective,
  BgImageDirective,
  CopyToClipboardDirective
];

@NgModule({
  declarations: [...dependencies],
  exports: [...dependencies]
})
export class SerUiModule {}
