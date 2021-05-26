import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { hasValue } from '../utils/check';

@Pipe({
    name: 'dateUTC',
})
export class DateUTCPipe implements PipeTransform {

    constructor(private datePipe: DatePipe) {}

    transform(value: any, format?: string, timezone?: string, locale?: string): string | null {

        if (!hasValue(value)) {
            return '';
        }

        if (!(/^z/.test(value))) {
            value = value + 'Z';
        }

        return this.datePipe.transform(value, format, timezone, locale);
    }
}
