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
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Abstract2FcPipe } from './abstract-2-fc.pipe';
import { Abstract2FgPipe } from './abstract-2-fg.pipe';
import { Abstract2FaPipe } from './abstract-2-fa.pipe';

const dependencies = [
    WhenScrolledDirective,
    FinishTypingDirective,
    BgImageDirective,
    CopyToClipboardDirective,
    ToggleClassDirective,
    LongPressDirective,
    DateUTCPipe,
    CurrencyCOPPipe,
    FilterList,
    Abstract2FcPipe,
    Abstract2FgPipe,
    Abstract2FaPipe
];

@NgModule({
    declarations: [...dependencies],
    providers: [CurrencyPipe, DatePipe],
    exports: [...dependencies]
})
export class SerUiModule { }
