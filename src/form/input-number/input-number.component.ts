import { Subscription } from 'rxjs';
import { Component, forwardRef, OnInit, ViewEncapsulation, OnDestroy, HostBinding, AfterViewInit, ElementRef, Renderer2, Output, EventEmitter, ViewChildren } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR } from '@angular/forms';
import { hasValue } from '../../utils/check';


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
export class InputNumberComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {

    @HostBinding('class.disabled') isDisabled = false;
    @ViewChildren('input') input: ElementRef;
    @Output() focus: EventEmitter<void> = new EventEmitter<void>();
    @Output() blur: EventEmitter<void> = new EventEmitter<void>();

    value: string;
    modelSub: Subscription;

    // tslint:disable-next-line: max-line-length
    viaOptionsSubs$: Subscription[] = [];
    private viewInitialized = false;

    constructor(private _fb: FormBuilder, private _renderer: Renderer2, private _elementRef: ElementRef) { }

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

        /* this.modelSub = this.modelForm.valueChanges.subscribe(() => {
            if (this.modelForm.valid) {
                this.onChange(this.generateValue());
            } else if (!this.isDisabled) {
                this.onChange(null);
            }
        }); */
    }

    ngAfterViewInit(): void {
        this.viewInitialized = true;
    }

    ngOnDestroy() {
        // this.modelSub.unsubscribe();
    }

}
