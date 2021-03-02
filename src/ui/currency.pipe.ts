import { CurrencyPipe } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'currencyCOP',
})
export class CurrencyCOPPipe extends CurrencyPipe implements PipeTransform {

    constructor(@Inject(LOCALE_ID) locale: string) {
        super(locale);
    }

    transform(value: any) {
        return super.transform(value, '', '$', '1.0-5');
    }
}
