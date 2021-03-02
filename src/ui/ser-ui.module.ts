import { NgModule } from '@angular/core';
import { WhenScrolledDirective } from './when-scrolled.directive';
import { FinishTypingDirective } from './finish-typing.directive';
import { BgImageDirective } from './bg-image.directive';
import { CopyToClipboardDirective } from './copy-to-clipboard.directive';
import { ToggleClassDirective } from './toggle-class.directive';
import { LongPressDirective } from './long-press.directive';
import { DateUTCPipe } from './date.pipe';
import { FilterList } from './filter.pipe';
import { CurrencyCOPPipe } from './currency.pipe';

const dependencies = [
  WhenScrolledDirective,
  FinishTypingDirective,
  BgImageDirective,
  CopyToClipboardDirective,
  ToggleClassDirective,
  LongPressDirective,
  DateUTCPipe,
  CurrencyCOPPipe,
  FilterList
];

@NgModule({
  declarations: [...dependencies],
  exports: [...dependencies]
})
export class SerUiModule {}
