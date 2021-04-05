import { DatePipe } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { hasValue } from '../utils/check';

@Pipe({
    name: 'dateUTC',
})
export class DateUTCPipe extends DatePipe implements PipeTransform {

    constructor(@Inject(LOCALE_ID) locale: string) {
        super(locale);
    }

    transform(value: any, format?: string, timezone?: string, locale?: string) {

        if (!hasValue(value)) {
            return '';
        }

        if (!(/^z/.test(value))) {
            value = value + 'Z';
        }

        return super.transform(value, format, timezone, locale);
    }
}
