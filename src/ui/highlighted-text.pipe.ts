import { Pipe, PipeTransform } from '@angular/core';
import { removeDiacriticsLegacy } from '../utils/diacritics';
import { hasValueLegacy } from '../utils/check';

/**
 * Based on https://dev.to/this-is-angular/search-and-highlight-text-feature-using-angular-l98
 */
@Pipe({
    name: 'highlightedText'
})
export class HighlightedTextLegacyPipe implements PipeTransform {

    transform(value: any, args: string, normalize = false, minChar = 2): unknown {

        if (!hasValueLegacy(value) || !args || (minChar !== undefined && args.length < minChar)) return value;

        if (typeof value !== 'string') {
            value = value.toString();
        }

        // If normalization is enabled, remove diacritics
        const normalizedArgs = normalize ? removeDiacriticsLegacy(args) : args;
        const normalizedValue = normalize ? removeDiacriticsLegacy(value) : value;

        // Create a regular expression to search for the normalized term
        const re = new RegExp(normalizedArgs, 'igm');

        // Replace the found terms in the original text (not normalized if normalize is false)
        let result = '';
        let lastIndex = 0;
        let match: RegExpExecArray;

        while ((match = re.exec(normalizedValue)) !== null) {
            result += value.substring(lastIndex, match.index);
            result += `<span class="highlighted-text">${value.substring(match.index, match.index + match[0].length)}</span>`;
            lastIndex = match.index + match[0].length;
        }

        result += value.substring(lastIndex);
        return result;
    }

}
