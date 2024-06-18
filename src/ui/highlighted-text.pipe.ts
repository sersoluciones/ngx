import { Pipe, PipeTransform } from '@angular/core';

/**
 * Based on https://dev.to/this-is-angular/search-and-highlight-text-feature-using-angular-l98
 */
@Pipe({
    name: 'highlightedText'
})
export class HighlightedTextPipe implements PipeTransform {

    transform(value: any, args: string, minChar?: number): unknown {

        if (!args || (minChar !== undefined && args.length < minChar)) return value;

        const re = new RegExp(args, 'igm');
        value = value.replace(re, '<span class="highlighted-text">$&</span>');

        return value;
    }

}
