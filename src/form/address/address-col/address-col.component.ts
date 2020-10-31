import { fromEvent, Subscription } from 'rxjs';
import { Component, forwardRef, OnInit, ViewEncapsulation, OnDestroy, HostBinding, AfterViewInit, ElementRef, ViewChild, Renderer2, Output, EventEmitter, HostListener } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { hasValue } from '../../../utils/check';
import { inArray } from '../../..//utils/array';
import { filter } from 'rxjs/operators';

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

    @ViewChild('viaOptionsEl') viaOptionsEl: ElementRef;
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

    modelSub: Subscription;
    modelForm = this._fb.group({
        via: ['', [Validators.required]],
        address1: ['', [Validators.required, Validators.maxLength(50)]],
        address2: ['', Validators.maxLength(50)],
        address3: ['', Validators.maxLength(50)]
    });

    // tslint:disable-next-line: max-line-length
    viaOptionsSubs: Subscription[] = [];
    viaRegex = /^Autopista|Avenida Calle|Avenida Carrera|Avenida|Calle|Carrera|Circunvalar|Circular|Diagonal|Kilometro|Manzana|Transversal$/i;
    viaOptions = [
        'Calle', 'Carrera', 'Autopista', 'Avenida', 'Avenida Calle', 'Avenida Carrera', 'Circunvalar', 'Circular', 'Diagonal', 'Kilometro', 'Manzana', 'Transversal', 'Via'
    ];

    viaOptionsOriginal = [
        'Calle', 'Carrera', 'Autopista', 'Avenida', 'Avenida Calle', 'Avenida Carrera', 'Circunvalar', 'Circular', 'Diagonal', 'Kilometro', 'Manzana', 'Transversal', 'Via'
    ];

    constructor(private _fb: FormBuilder, private _renderer: Renderer2, private _elementRef: ElementRef) { }

    @HostListener('click')
    click() {
        if (!this.focused) {
            this.viaEl.nativeElement.focus();
        }
    }

    writeValue(obj: any) {

        if (hasValue(obj)) {
            let address1: any;
            let address2: any;
            let address3: any;

            obj = obj.trim().replace(/\s+/g, ' ');

            if (/(\s?-\s?)+/.test(obj)) {
                address3 = obj.split(/(\s?-\s?)+/);
                this.modelForm.get('address3').setValue(address3[address3.length - 1].trim().split(' ').map(val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()).join(' '));
                address2 = address3[0].trim();
            } else {
                address2 = obj;
            }

            if (/(\s?[#]\s?)+/.test(address2)) {
                address2 = address2.split(/(\s?[#]\s?)+/);
                this.modelForm.get('address2').setValue(address2[address2.length - 1].trim().split(' ').map(val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()).join(' '));
                address1 = address2[0].trim();
            } else {
                address1 = obj;
            }

            if (this.viaRegex.test(address1)) {
                address1 = address1.split(this.viaRegex);
                this.modelForm.get('address1').setValue(address1[address1.length - 1].trim().split(' ').map(val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()).join(' '));

                setTimeout(() => {
                    this.setVia(this.viaRegex.exec(obj)[0].split(' ').map(val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()).join(' '));
                });
            }

        }
    }

    generateValue() {
        const address = this.modelForm.get('via').value + ' ' +
        this.modelForm.get('address1').value?.trim().split(' ').map(val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()).join(' ') +
        ' # ' +
        this.modelForm.get('address2').value?.trim().split(' ').map(val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()).join(' ') +
        ' - ' +
        this.modelForm.get('address3').value?.trim().split(' ').map(val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()).join(' ');

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

    ngOnInit() {

        this.modelSub = this.modelForm.valueChanges.subscribe(() => {
            if (this.modelForm.valid) {
                this.onChange(this.generateValue());
            } else {
                this.onChange(null);
            }
        });
    }

    ngAfterViewInit(): void {
        this._renderer.removeChild(this.viaElCont.nativeElement, this.viaOptionsEl.nativeElement);

        setTimeout(() => {
            if (!hasValue(this.viaElHint.nativeElement.value)) {
                this.viaElHint.nativeElement.value = 'Calle';
            }
        });
    }

    public openViaOptions() {

        setTimeout(() => {
            this.viaOptionsSubs.push(
                fromEvent(window, 'click')
                .pipe(filter((e: MouseEvent) => !this.viaElCont.nativeElement.contains(e.target) ))
                .subscribe(() => {
                    this.setVia(this.viaOptions[0]);
                })
            );
        });

        this.viaOptionsSubs.push(
            fromEvent(window, 'keyup')
            .pipe(filter((e: KeyboardEvent) => inArray(e.key.toLowerCase(), ['arrowright', 'escape', 'enter'])))
            .subscribe(() => {
                this.setVia(this.viaOptions[0]);
            })
        );

        this.filterViaOptions(this.modelForm.get('via').value);
        this.setPositionDropdown();

        this.focus.emit();

        this._renderer.appendChild(this.viaElCont.nativeElement, this.viaOptionsEl.nativeElement);
    }

    public closeDropdown() {
        this.viaOptionsSubs.forEach(s => s.unsubscribe() );
        this.viaOptionsSubs = [];
        this._renderer.removeChild(this.viaElCont.nativeElement, this.viaOptionsEl.nativeElement);
        this.address1.nativeElement.focus();
    }

    setPositionDropdown() {

        setTimeout(() => {

            const dropdown = (this.viaOptionsEl.nativeElement as HTMLDivElement);
            const el = (this.viaEl.nativeElement as HTMLElement);
            const remainingHeight = document.documentElement.offsetHeight - (dropdown.offsetHeight + el.getBoundingClientRect().top + el.offsetHeight);

            this._renderer.setStyle(dropdown, 'left', (el.getBoundingClientRect().left - 6) + 'px');

            if (remainingHeight > 0) {
                this._renderer.removeClass(el, 'ontop');
                this._renderer.removeClass(dropdown, 'ontop');
                this._elementRef.nativeElement.style.removeProperty('bottom');
                this._renderer.setStyle(dropdown, 'top', el.getBoundingClientRect().bottom + 'px');
            } else {
                this._renderer.addClass(el, 'ontop');
                this._renderer.addClass(dropdown, 'ontop');
                this._elementRef.nativeElement.style.removeProperty('top');
                this._renderer.setStyle(dropdown, 'bottom', (document.documentElement.offsetHeight - el.getBoundingClientRect().top) + 'px');
            }

        });
    }

    filterViaOptions(value: string) {

        if (hasValue(value)) {
            this.viaOptions = this.viaOptionsOriginal.filter(it => it.slice(0, value.length).toLowerCase() === value?.toLowerCase());

            if (hasValue(this.viaOptions)) {
                this.viaElHint.nativeElement.value = this.viaOptions[0];
                this.viaEl.nativeElement.value = this.viaEl.nativeElement.value?.split(' ').map(val => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()).join(' ');
            } else {
                this.viaElHint.nativeElement.value = '';
            }

            setTimeout(() => {
                this.setPositionDropdown();
            });
        } else {
            this.viaOptions = this.viaOptionsOriginal;
        }

    }

    viaBlur() {
        if (!hasValue(this.modelForm.get('via').value)) {
            this.setVia(this.viaOptions[0]);
        }
    }

    setVia(value: string) {
        if (hasValue(value)) {
            this.modelForm.get('via').setValue(value);
            this.viaEl.nativeElement.value = value;
            this.viaElHint.nativeElement.value = value;
        } else {
            this.viaEl.nativeElement.value = '';
            this.viaElHint.nativeElement.value = '';
        }

        this.closeDropdown();
    }

    setFocus() {
        this.focused = true;
        this.focus.emit();
    }

    setBlur() {
        this.focused = false;
        this.blur.emit();

        if (!hasValue(this.address1.nativeElement.value)) {
            this.viaEl.nativeElement.value = '';
            this.viaElHint.nativeElement.value = 'Calle';
            this.viaOptions = this.viaOptionsOriginal;
        }
    }

    ngOnDestroy() {
        this.modelSub.unsubscribe();
        this.viaOptionsSubs?.forEach(s => s?.unsubscribe() );
    }

}
