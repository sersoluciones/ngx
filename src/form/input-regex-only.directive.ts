import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[formControlName][inputRegexOnly]'
})
export class InputRegexOnlyDirective {

    private _inputRegexOnly: string;

    public get inputRegexOnly() {
        return this._inputRegexOnly;
    }

    @Input()
    public set inputRegexOnly(value) {
        this._inputRegexOnly = value;
        this.regex = new RegExp(value, 'g');
    }

    regex: RegExp;

    constructor(private readonly control: NgControl) { }

    @HostListener('input', ['$event.target'])
    public onInput(input: HTMLInputElement): void {
        const val = input.value.match(this.regex);
        this.control.control.setValue(val != null ? val.join('') : '');
    }
}
