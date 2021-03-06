import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[formControlName][inputLowerCase]'
})
export class InputLowerCaseDirective {

    constructor(private readonly control: NgControl) { }

    @HostListener('input', ['$event.target'])
    public onInput(input: HTMLInputElement): void {
        this.control.control.setValue(input.value.trim().toLowerCase());
    }
}
