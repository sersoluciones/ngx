import { fromEvent, merge, Observable, Subscription } from 'rxjs';
import { Component, forwardRef, OnInit, ViewEncapsulation, OnDestroy, HostBinding, AfterViewInit, ElementRef, ViewChild, Renderer2, Output, EventEmitter, HostListener } from '@angular/core';
import { ControlValueAccessor, UntypedFormBuilder, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { hasValue } from '../../utils/check';
import { inArray } from '../../utils/array';
import { filter } from 'rxjs/operators';
import { fromIntersectionObserver } from '../../utils/rx-utils';

@Component({
  selector: 'chips-input',
  templateUrl: './chips.component.html',
  providers: [
      {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => ChipsComponent),
          multi: true
      }
  ],
  encapsulation: ViewEncapsulation.None
})
export class ChipsComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {

    @ViewChild('viaElCont') viaElCont: ElementRef<HTMLDivElement>;
    @ViewChild('address1') address1: ElementRef<HTMLInputElement>;
    @HostBinding('class.disabled') isDisabled = false;
    focused = false;
    @Output() focus: EventEmitter<void> = new EventEmitter<void>();
    @Output() blur: EventEmitter<void> = new EventEmitter<void>();

    private parents: HTMLElement[] = [];

    modelSub: Subscription;
    modelForm = this._fb.group({
        via: ['', [Validators.required]]
    });

    // tslint:disable-next-line: max-line-length
    viaOptionsSubs$: Subscription[] = [];
    viaRegex = /^Autopista|Avenida Calle|Avenida Carrera|Avenida|Calle|Carrera|Circunvalar|Circular|Diagonal|Kilometro|Manzana|Transversal$/i;
    viaOptions = [
        'Calle', 'Carrera', 'Autopista', 'Avenida', 'Avenida Calle', 'Avenida Carrera', 'Circunvalar', 'Circular', 'Diagonal', 'Kilometro', 'Manzana', 'Transversal', 'Via'
    ];

    viaOptionsOriginal = [
        'Calle', 'Carrera', 'Autopista', 'Avenida', 'Avenida Calle', 'Avenida Carrera', 'Circunvalar', 'Circular', 'Diagonal', 'Kilometro', 'Manzana', 'Transversal', 'Via'
    ];

    private _absolutePos = (document.body.classList.contains('bpt-mobile') || document.body.classList.contains('bpt-tablet')) && window.innerWidth < 600;

    private lateInstance = {
        via: null,
        address1: null,
        address2: null,
        address3: null
    };
    private viewInitialized = false;

    constructor(private _fb: UntypedFormBuilder, private _renderer: Renderer2, private _elementRef: ElementRef<HTMLElement>) { }

    //#region ControlValueAccessor
    writeValue(obj: any) {

        if (hasValue(obj)) {
            let address1: any;

            obj = obj.trim().replace(/\s+/g, ' ');

            if (this.viaRegex.test(address1)) {
                address1 = address1.split(this.viaRegex);

                const _address = address1[address1.length - 1].trim().split(' ').map(val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()).join(' ');
                if (!this.viewInitialized) {
                    this.lateInstance.address1 = _address;
                } else {
                    this.modelForm.get('address1').setValue(_address);
                }

                const _via = this.viaRegex.exec(obj)[0].split(' ').map(val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()).join(' ');

                if (!this.viewInitialized) {
                    this.lateInstance.via = _via;
                } else {
                    this.modelForm.get('via').setValue(_via);
                }
            }

        } else {
            this.modelForm.reset();
        }
    }

    generateValue() {
        let address = this.modelForm.get('via').value;

        if (hasValue(this.modelForm.get('address1').value)) {
            address += ' ' + this.modelForm.get('address1').value?.trim().split(' ').map(val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()).join(' ');
        }

        if (hasValue(this.modelForm.get('address2').value)) {
            address += ' # ' + this.modelForm.get('address2').value?.trim().split(' ').map(val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()).join(' ');
        }

        if (hasValue(this.modelForm.get('address3').value)) {
            address += ' - ' + this.modelForm.get('address3').value?.trim().split(' ').map(val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()).join(' ');
        }

        return address;
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

        if (isDisabled) {
            this.modelForm.disable();
        } else {
            this.modelForm.enable();
        }
    }
    //#endregion

    ngOnInit() {

        this.modelSub = this.modelForm.valueChanges.subscribe(() => {
            if (this.modelForm.valid) {
                this.onChange(this.generateValue());
            } else if (!this.isDisabled) {
                this.onChange(null);
            }
        });
    }

    ngAfterViewInit(): void {

        this.viewInitialized = true;
        let parent = this._elementRef.nativeElement.parentElement;

        while (hasValue(parent)) {

            if (inArray(getComputedStyle(parent).overflowY, ['auto', 'scroll', 'overlay']) || inArray(getComputedStyle(parent).overflowX, ['auto', 'scroll', 'overlay'])) {
                this.parents.push(parent);
            }

            parent = parent.parentElement;
        }

        setTimeout(() => {
            if (hasValue(this.lateInstance.via)) {
                this.modelForm.get('via').setValue(this.lateInstance.via);
                this.lateInstance.via = null;
            }
        });

        // this._renderer.removeChild(this.viaElCont.nativeElement, this.viaOptionsEl.nativeElement);

    }

    public closeDropdown() {
        this.viaOptionsSubs$.forEach(s => s.unsubscribe() );
        this.viaOptionsSubs$ = [];
        // this._renderer.removeChild(this.viaElCont.nativeElement, this.viaOptionsEl.nativeElement);
        this.address1.nativeElement.focus();
    }

    onKeydown(el: string, ev: KeyboardEvent) {

        if (ev.key.toLowerCase() === 'backspace' && !hasValue((ev.target as HTMLInputElement).value)) {
            /* switch (el) {
                case 'address1':
                    this.viaEl.nativeElement.focus();
                    break;

                case 'address2':
                    this.address1.nativeElement.focus();
                    break;

                case 'address3':
                    this.address2.nativeElement.focus();
                    break;
            } */
        }

    }

    setFocus(el: string) {

        this.focused = true;
        this.focus.emit();
    }

    setBlur() {
        this.focused = false;
        this.blur.emit();

        if (!hasValue(this.address1.nativeElement.value)) {
            this.modelForm.get('via').setValue('');
            this.viaOptions = this.viaOptionsOriginal;
        }
    }

    ngOnDestroy() {
        this.modelSub.unsubscribe();
        this.viaOptionsSubs$?.forEach(s => s?.unsubscribe() );
    }

}
