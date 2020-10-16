import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[copyToClipboard]'
})
export class CopyToClipboardDirective {

    @Input('copyToClipboard') valToCopy = '';
    @Output() copied = new EventEmitter<string>();

    @HostListener('click', ['$event']) onClick(val: any) {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.zIndex = '-1000';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = this.valToCopy;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);

        this.copied.emit(this.valToCopy);
    }

}
