import { Component, forwardRef, ViewEncapsulation, HostBinding, Output, EventEmitter, ViewChild, ElementRef, Input, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { hasValue } from '../../utils/check';


@Component({
  selector: 'ser-input-currency',
  templateUrl: './input-currency.component.html',
  providers: [
      {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => InputCurrencyComponent),
          multi: true
      }
  ],
  encapsulation: ViewEncapsulation.None
})
export class InputCurrencyComponent implements ControlValueAccessor {

    @ViewChild('input') inputEl: ElementRef<HTMLInputElement>;
    @HostBinding('class.disabled') isDisabled = false;
    @Output() focus: EventEmitter<void> = new EventEmitter<void>();
    @Output() blur: EventEmitter<void> = new EventEmitter<void>();
    @Input() maxLength = 50;

    value: string = null;

    //#region ControlValueAccessor
    writeValue(obj: any) {
        this.value = obj?.toString();
    }

    setValue() {

        if (hasValue(this.value)) {

            if (typeof this.value === 'string') {
                this.onChange(parseFloat(this.value));
            } else {
                this.onChange(this.value);
            }

        } else {
            this.onChange(null);
        }
    }

    setBlur() {
        this.blur.emit();
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }
    onChange(_: any) { }

    registerOnTouched(fn: any) {
        this.onTouch = fn;
    }
    onTouch() { }

    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }
    //#endregion

}
