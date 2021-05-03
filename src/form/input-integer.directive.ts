import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[formControlName][inputInteger]'
})
export class InputIntegerDirective {

    constructor(private readonly control: NgControl) { }

    @HostListener('input', ['$event.target'])
    public onInput(input: HTMLInputElement): void {
        this.control.control.setValue(parseInt(input.value.trim(), 10));
    }
}
