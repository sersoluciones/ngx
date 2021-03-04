import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { copyToClipboard } from '../utils/navigator';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[copyToClipboard]'
})
export class CopyToClipboardDirective {

    @Input('copyToClipboard') valToCopy = '';
    @Output() copied = new EventEmitter<string>();

    @HostListener('click', ['$event']) onClick(val: any) {
        copyToClipboard(this.valToCopy);
        this.copied.emit(this.valToCopy);
    }

}
