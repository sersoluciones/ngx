import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[formControlName][inputNameCase]'
})
export class InputNameCaseDirective {

    constructor(private readonly control: NgControl) { }

    @HostListener('input', ['$event.target'])
    public onInput(input: HTMLInputElement): void {
        this.control.control.setValue(input.value.toLowerCase().split(/\s+/).map(val => {

            if (!val.match(/\b(de|del|la|el|of)\b/g)) {
                return val.charAt(0).toUpperCase() + val.slice(1);
            }

            return val;

        }).join(' '));
    }
}
