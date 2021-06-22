import { ElementRef, ViewChild } from '@angular/core';
import { Component, forwardRef, OnInit, ViewEncapsulation, OnDestroy, HostBinding, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
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
export class InputCurrencyComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {

    @ViewChild('input') inputEl: ElementRef<HTMLInputElement>;
    @HostBinding('class.disabled') isDisabled = false;
    @Output() focus: EventEmitter<void> = new EventEmitter<void>();
    @Output() blur: EventEmitter<void> = new EventEmitter<void>();
    @Input() maxLength = 50;

    value: string;

    //#region ControlValueAccessor
    writeValue(obj: any) {

        if (hasValue(obj)) {
            this.value = obj;
        } else {
            this.value = null;
        }

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

        if (!hasValue(this.value)) {
            this.inputEl.nativeElement.value = null;
        }

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

    ngOnInit() {

    }

    ngAfterViewInit(): void {

    }

    ngOnDestroy() {
        // this.modelSub.unsubscribe();
    }

}
