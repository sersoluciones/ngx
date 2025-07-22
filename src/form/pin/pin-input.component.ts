// tslint:disable: component-selector
import { AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, HostBinding, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { hasValueLegacy } from '../../utils/check';

@Component({
    selector: 'pin-input',
    templateUrl: './pin-input.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PinInputComponent),
            multi: true
        }
    ]
})
export class PinInputComponent implements AfterViewInit, OnInit, ControlValueAccessor {

    @ViewChildren('input') inputsList: QueryList<ElementRef<HTMLInputElement>>;
    @HostBinding('class.show') show = false;

    private inputs: HTMLInputElement[] = [];

    @Input() codeLength = 4;
    @Input() onlyNumber = true;
    @Input() isCodeHidden = false;

    @Output() focus: EventEmitter<void> = new EventEmitter<void>();
    @Output() blur: EventEmitter<void> = new EventEmitter<void>();

    codeInputs: any[];
    value = [];
    type: string;
    isDisabled = false;

    writeValue(obj: any) {
        if (hasValueLegacy(obj)) {
            this.value = obj.toString().split('');
        }
    }

    ngOnInit() {
        this.type = (this.isCodeHidden) ? 'password' : 'text';
        this.codeInputs = Array(this.codeLength);
    }

    ngAfterViewInit() {
        this.inputsList.forEach((item, i) => {

            if (this.onlyNumber) {
                item.nativeElement.setAttribute('inputmode', 'numeric');
            }

            if (hasValueLegacy(this.value[i])) {
                (item.nativeElement as HTMLInputElement).value = this.value[i];
            }

            this.inputs.push(item.nativeElement);
        });
    }

    private canInputValue(value: any): boolean {
        if (!hasValueLegacy(value)) {
            return true;
        }

        if (this.onlyNumber) {
            return /^[0-9]+$/.test(value.toString());
        } else {
            return /^[0-9a-zA-Z]+$/.test(value.toString());
        }
    }

    generateValue(): string | number {
        const values: string[] = [];

        this.inputs.forEach((input) => {

            if (hasValueLegacy(input.value)) {
                values.push(input.value.trim());
            }

        });

        if (values.length === this.codeLength) {
            return values.join('');
        } else {
            return null;
        }

    }

    onInput(e: any, i: number) {
        const next = i + 1;
        const target = e.target;
        const value = e.data || target.value;

        this.onTouch();

        if (!this.canInputValue(value)) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        if (next < this.codeLength && hasValueLegacy(value)) {
            this.inputs[next].focus();
        }

        this.onChange(this.generateValue());

    }

    isPasteEvent(e: KeyboardEvent) {
        return e.ctrlKey && e.key.toLowerCase() === 'v';
    }

    async onKeydown(e: KeyboardEvent, i: number) {
        const prev = i - 1;
        const next = i + 1;
        const value = (e.target as HTMLInputElement).value;
        const backspace = e.key.toLowerCase() === 'backspace';

        if (backspace) {

            if (prev >= 0) {

                setTimeout(() => {
                    this.inputs[prev].focus();
                });
            }

            return;

        }

        if (!this.canInputValue(e.key.toLowerCase()) && !this.isPasteEvent(e)) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        if (hasValueLegacy(value)) {
            e.preventDefault();
            e.stopPropagation();

            if (next < this.codeLength) {
                this.inputs[next].focus();
            }
        }
    }

    setFocus() {
        this.inputs[0].focus();
    }

    onClick(e: any) {

        let index = this.codeLength - 1;
        e.target.setSelectionRange(e.target.value.length, e.target.value.length);

        for (let i = 0; i < this.inputs.length; i++) {

            if (!hasValueLegacy(this.inputs[i].value)) {
                index = i;
                break;
            }
        }

        if (hasValueLegacy(index)) {
            this.inputs[index].focus();
        }
    }

    onFocus() {
        this.focus.emit();
    }

    onBlur() {
        this.blur.emit();
    }

    onPaste(ev: ClipboardEvent) {

        let data = ev.clipboardData.getData('text/plain').split('');

        if (data.length > this.codeLength) {
            data = data.slice(0, this.codeLength);
        }

        if (data.some(x => !this.canInputValue(x))) {
            return;
        }

        this.inputsList.forEach((item, i) => {

            if (data.length > i) {
                (item.nativeElement as HTMLInputElement).value = data[i];
                this.inputs[i].focus();
            }

        });

    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    onChange(_: any) { }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }
    onTouch() { }

    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }
}
