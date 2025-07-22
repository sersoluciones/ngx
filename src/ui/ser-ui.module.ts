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
import { Abstract2FcLegacyPipe } from './abstract-2-fc.pipe';
import { Abstract2FgLegacyPipe } from './abstract-2-fg.pipe';
import { Abstract2FaLegacyPipe } from './abstract-2-fa.pipe';
import { SafeHtmlPipe } from './safe.pipe';
import { HighlightedTextLegacyPipe } from './highlighted-text.pipe';

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
    Abstract2FcLegacyPipe,
    Abstract2FgLegacyPipe,
    Abstract2FaLegacyPipe,
    SafeHtmlPipe,
    HighlightedTextLegacyPipe
];

@NgModule({
    declarations: [...dependencies],
    providers: [CurrencyPipe, DatePipe],
    exports: [...dependencies]
})
export class SerUiModule { }
