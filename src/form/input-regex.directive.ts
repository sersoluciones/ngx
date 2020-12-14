import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[formControlName][inputRegex]'
})
export class InputRegexDirective {

    private _inputRegex: string;

    public get inputRegex() {
        return this._inputRegex;
    }

    @Input()
    public set inputRegex(value) {
        this._inputRegex = value;
        this.regex = new RegExp(value, 'g');
    }

    regex: RegExp;

    constructor(private readonly control: NgControl) { }

    @HostListener('input', ['$event.target'])
    public onInput(input: HTMLInputElement): void {
        this.control.control.setValue(input.value.replace(this.regex, ''));
    }
}
