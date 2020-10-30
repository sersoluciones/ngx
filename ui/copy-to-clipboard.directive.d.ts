import { EventEmitter } from '@angular/core';
export declare class CopyToClipboardDirective {
    valToCopy: string;
    copied: EventEmitter<string>;
    onClick(val: any): void;
}
