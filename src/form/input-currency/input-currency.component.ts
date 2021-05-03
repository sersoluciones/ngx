import { Component, forwardRef, OnInit, ViewEncapsulation, OnDestroy, HostBinding, AfterViewInit, ElementRef, Output, EventEmitter, ViewChildren } from '@angular/core';
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

    @HostBinding('class.disabled') isDisabled = false;
    @ViewChildren('input') input: ElementRef;
    @Output() focus: EventEmitter<void> = new EventEmitter<void>();
    @Output() blur: EventEmitter<void> = new EventEmitter<void>();

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
            this.onChange(parseFloat(this.value));
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

    ngOnInit() {

    }

    ngAfterViewInit(): void {

    }

    ngOnDestroy() {
        // this.modelSub.unsubscribe();
    }

}
