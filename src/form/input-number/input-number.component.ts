import { Component, forwardRef, ViewEncapsulation, HostBinding, Output, EventEmitter, ViewChild, ElementRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { hasValueLegacy } from '../../utils/check';


@Component({
  selector: 'ser-input-number',
  templateUrl: './input-number.component.html',
  providers: [
      {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => InputNumberComponent),
          multi: true
      }
  ],
  encapsulation: ViewEncapsulation.None
})
export class InputNumberComponent implements ControlValueAccessor {

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
        if (hasValueLegacy(this.value)) {

            if (typeof this.value === 'string') {
                this.onChange(parseFloat(this.value.trim()));
            } else {
                this.onChange(this.value);
            }

        } else {
            this.onChange(null);
        }
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
