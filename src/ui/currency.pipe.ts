import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'currencyCOP',
})
export class CurrencyCOPPipe implements PipeTransform {

    constructor(private currencyPipe: CurrencyPipe) {}

    transform(value: any): string {
        return this.currencyPipe.transform(value, '', '$', '1.0-5');
    }
}
