import { fromEvent, merge, Observable, Subscription } from 'rxjs';
import { Component, forwardRef, OnInit, ViewEncapsulation, OnDestroy, HostBinding, AfterViewInit, ElementRef, ViewChild, Renderer2, Output, EventEmitter, HostListener } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { hasValue } from '../../../utils/check';
import { inArray } from '../../..//utils/array';
import { filter } from 'rxjs/operators';
import { fromIntersectionObserver } from '../../../utils/rx-utils';

@Component({
  selector: 'address-col-input',
  templateUrl: './address-col.component.html',
  providers: [
      {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => AddressColComponent),
          multi: true
      }
  ],
  encapsulation: ViewEncapsulation.None
})
export class AddressColComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {

    @ViewChild('viaOptionsEl') viaOptionsEl: ElementRef<HTMLDivElement>;
    @ViewChild('viaElCont') viaElCont: ElementRef;
    @ViewChild('viaEl') viaEl: ElementRef;
    @ViewChild('viaElHint') viaElHint: ElementRef;
    @ViewChild('address1') address1: ElementRef;
    @ViewChild('address2') address2: ElementRef;
    @ViewChild('address3') address3: ElementRef;
    @HostBinding('class.disabled') isDisabled = false;
    focused = false;
    @Output() focus: EventEmitter<void> = new EventEmitter<void>();
    @Output() blur: EventEmitter<void> = new EventEmitter<void>();

    private parents: Element[] = [];

    modelSub: Subscription;
    modelForm = this._fb.group({
        via: ['', [Validators.required]],
        address1: ['', [Validators.required, Validators.maxLength(50)]],
        address2: ['', Validators.maxLength(50)],
        address3: ['', Validators.maxLength(50)]
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

    private lateInstance = {
        via: null,
        address1: null,
        address2: null,
        address3: null
    };
    private viewInitialized = false;

    constructor(private _fb: FormBuilder, private _renderer: Renderer2, private _elementRef: ElementRef) { }

    //#region ControlValueAccessor
    writeValue(obj: any) {

        if (hasValue(obj)) {
            let address1: any;
            let address2: any;
            let address3: any;

            obj = obj.trim().replace(/\s+/g, ' ');

            if (/(\s?-\s?)+/.test(obj)) {
                address3 = obj.split(/(\s?-\s?)+/);

                const _address = address3[address3.length - 1].trim().split(' ').map(val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()).join(' ');
                if (!this.viewInitialized) {
                    this.lateInstance.address3 = _address;
                } else {
                    this.modelForm.get('address3').setValue(_address);
                }

                address2 = address3[0].trim();
            } else {
                address2 = obj;
            }

            if (/(\s?[#]\s?)+/.test(address2)) {
                address2 = address2.split(/(\s?[#]\s?)+/);

                const _address = address2[address2.length - 1].trim().split(' ').map(val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()).join(' ');
                if (!this.viewInitialized) {
                    this.lateInstance.address2 = _address;
                } else {
                    this.modelForm.get('address2').setValue(_address);
                }

                address1 = address2[0].trim();
            } else {
                address1 = obj;
            }

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
                    this.viaEl.nativeElement.value = _via;
                    this.viaElHint.nativeElement.value = _via;
                }
            }

        } else {
            this.modelForm.reset();

            if (this.viewInitialized) {
                this.viaEl.nativeElement.value = '';
                this.viaElHint.nativeElement.value = '';
            }
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
                this.viaEl.nativeElement.value = this.lateInstance.via;
                this.viaElHint.nativeElement.value = this.lateInstance.via;
                this.lateInstance.via = null;
            }

            if (hasValue(this.lateInstance.address1)) {
                this.modelForm.get('address1').setValue(this.lateInstance.address1);
                this.lateInstance.address1 = null;
            }

            if (hasValue(this.lateInstance.address2)) {
                this.modelForm.get('address2').setValue(this.lateInstance.address2);
                this.lateInstance.address2 = null;
            }

            if (hasValue(this.lateInstance.address3)) {
                this.modelForm.get('address3').setValue(this.lateInstance.address3);
                this.lateInstance.address3 = null;
            }
        });

        this._renderer.removeChild(this.viaElCont.nativeElement, this.viaOptionsEl.nativeElement);

    }

    public openViaOptions() {

        this.setPositionDropdown();

        const parents$: Observable<any>[] = [
            fromEvent(document, 'scroll'),
            fromEvent(document, 'resize')
        ];

        this.parents.forEach((parent) => {
            parents$.push(fromEvent(parent, 'scroll'));
        });

        setTimeout(() => {
            this.viaOptionsSubs$.push(

                merge(
                    fromEvent(window, 'click')
                        .pipe(filter((e: MouseEvent) => !this.viaElCont.nativeElement.contains(e.target) )),

                    fromEvent(window, 'keyup')
                        .pipe(filter((e: KeyboardEvent) => inArray(e.key.toLowerCase(), ['arrowright', 'escape', 'enter']))),

                    fromIntersectionObserver(this.viaElCont.nativeElement)
                        .pipe(filter((ev) => !ev[0].isIntersecting))
                )
                .subscribe(() => {
                    this.setVia(this.viaOptions[0]);
                }),

                merge(...parents$).subscribe(() => this.setPositionDropdown())
            );
        });

        this.focus.emit();

        this._renderer.appendChild(this.viaElCont.nativeElement, this.viaOptionsEl.nativeElement);
    }

    public closeDropdown() {
        this.viaOptionsSubs$.forEach(s => s.unsubscribe() );
        this.viaOptionsSubs$ = [];
        this._renderer.removeChild(this.viaElCont.nativeElement, this.viaOptionsEl.nativeElement);
        this.address1.nativeElement.focus();
    }

    setPositionDropdown() {

        setTimeout(() => {

            const dropdown = this.viaOptionsEl.nativeElement;
            const el = (this.viaEl.nativeElement as HTMLElement);
            const remainingHeight = document.documentElement.offsetHeight - (dropdown.offsetHeight + el.getBoundingClientRect().top + el.offsetHeight);

            this._renderer.setStyle(dropdown, 'left', (el.getBoundingClientRect().left - 6) + 'px');

            if (remainingHeight > 0) {
                this._renderer.removeClass(el, 'ontop');
                this._renderer.removeClass(dropdown, 'ontop');
                this._renderer.removeStyle(dropdown, 'bottom');
                this._renderer.setStyle(dropdown, 'top', el.getBoundingClientRect().bottom + 'px');
            } else {
                this._renderer.addClass(el, 'ontop');
                this._renderer.addClass(dropdown, 'ontop');
                this._renderer.removeStyle(dropdown, 'top');
                this._renderer.setStyle(dropdown, 'bottom', (document.documentElement.offsetHeight - el.getBoundingClientRect().top) + 'px');
            }

        });
    }

    filterViaOptions(value: string) {

        if (hasValue(value)) {
            this.viaEl.nativeElement.value = this.viaEl.nativeElement.value?.split(' ').map(val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()).join(' ');
            this.viaOptions = this.viaOptionsOriginal.filter(it => it.slice(0, value.length).toLowerCase() === value?.toLowerCase());

            if (hasValue(this.viaOptions)) {
                this.viaElHint.nativeElement.value = this.viaOptions[0];
            } else {
                this.viaElHint.nativeElement.value = '';
            }

            setTimeout(() => {
                this.setPositionDropdown();
            });
        } else {
            this.viaOptions = this.viaOptionsOriginal;
            this.viaElHint.nativeElement.value = this.viaOptions[0];
        }

    }

    setVia(value: string) {
        if (hasValue(value)) {
            this.modelForm.get('via').setValue(value);
            this.viaEl.nativeElement.value = value;
            this.viaElHint.nativeElement.value = value;
            this.viaOptions = this.viaOptionsOriginal;
        } else {
            this.modelForm.get('via').setValue('');
            this.viaEl.nativeElement.value = '';
            this.viaElHint.nativeElement.value = '';
        }

        this.closeDropdown();
    }

    onKeydown(el: string, ev: KeyboardEvent) {

        if (ev.key.toLowerCase() === 'backspace' && !hasValue((ev.target as HTMLInputElement).value)) {
            switch (el) {
                case 'address1':
                    this.viaEl.nativeElement.focus();
                    break;

                case 'address2':
                    this.address1.nativeElement.focus();
                    break;

                case 'address3':
                    this.address2.nativeElement.focus();
                    break;
            }
        }

    }

    setFocus(el: string) {

        switch (el) {
            case 'address1':
                if (!hasValue((this.viaEl.nativeElement as HTMLInputElement).value)) {
                    this.viaEl.nativeElement.focus();
                }
                break;

            case 'address2':
                if (!hasValue(this.modelForm.get('address1').value)) {
                    this.address1.nativeElement.focus();
                }
                break;

            case 'address3':
                if (!hasValue(this.modelForm.get('address2').value)) {
                    this.address2.nativeElement.focus();
                }
                break;
        }

        this.focused = true;
        this.focus.emit();
    }

    setBlur() {
        this.focused = false;
        this.blur.emit();

        if (!hasValue(this.address1.nativeElement.value)) {
            this.viaEl.nativeElement.value = '';
            this.modelForm.get('via').setValue('');
            this.viaElHint.nativeElement.value = 'Calle';
            this.viaOptions = this.viaOptionsOriginal;
        }
    }

    @HostListener('click')
    click() {
        if (!this.focused) {
            this.viaEl.nativeElement.focus();
        }
    }

    ngOnDestroy() {
        this.modelSub.unsubscribe();
        this.viaOptionsSubs$?.forEach(s => s?.unsubscribe() );
    }

}
