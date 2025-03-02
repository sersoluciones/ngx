import { Component, OnInit, OnDestroy, SimpleChanges, OnChanges, ViewEncapsulation, forwardRef, AfterViewInit, ElementRef, Input, EventEmitter, Output, Attribute, Optional, HostBinding, HostListener, ViewChild, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { hasValue } from '../../utils/check';
import { mergeObjs, noop } from '../../utils/object';
import AirDatepicker, { AirDatepickerViewsSingle } from './base/datepicker';
import { EssiDateInputSettings } from './essi-date.interface';
import localeEs from './base/locale/es';
import { fromEvent, merge, Observable, Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';
import { fromIntersectionObserver } from '../../utils/rx-utils';
import { inArray } from '../../utils/array';

@Component({
    selector: 'essi-date',
    templateUrl: './essi-date.component.html',
    host: { '[class]': 'settings.classes' },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => EssiDateComponent),
            multi: true
        }
    ],
    encapsulation: ViewEncapsulation.None
})
export class EssiDateComponent implements OnInit, ControlValueAccessor, OnChanges, AfterViewInit, OnDestroy {

    @HostBinding('class.time-picker') timeClass = false;
    @HostBinding('class.disabled') isDisabled = false;
    @HostBinding('class.active') isActive = false;

    @Input() settings: EssiDateInputSettings;

    @Output() onSelect = new EventEmitter<any>();
    @Output() onDeSelect = new EventEmitter<any>();
    @Output() onClear = new EventEmitter<any>();
    @Output() onOpen = new EventEmitter<any>();
    @Output() onClose = new EventEmitter<any>();

    @Output() focus = new EventEmitter<void>();
    @Output() blur = new EventEmitter<void>();
    @Output() onRenderCell = new EventEmitter<{ date: Date | Date[], cellType: AirDatepickerViewsSingle }>;

    @ViewChild('dropdown') _dropdownElem: ElementRef<HTMLDivElement>;
    @ViewChild('picker') _pickerEl!: ElementRef<HTMLDivElement>;
    @ViewChild('inputControl') _inputControlEl: ElementRef<HTMLDivElement>;

    private _viewInitialized = false;
    private _noReadEvent = false;
    private _value: any;
    private _picker: AirDatepicker<HTMLDivElement>;
    private _parents: HTMLElement[] = [];
    private _dropdownSubs$: Subscription[] = [];
    selectedDate: Date;

    defaultSettings: EssiDateInputSettings = {
        classes: '',
        timePicker: false,
        inputFormat: 'dd/MM/y',
        clear: true,
        escapeToClose: true,
        calendarOptions: {}
    };

    constructor(private _elementRef: ElementRef, private _renderer: Renderer2, @Optional() @Attribute('time') time: any,
        @Optional() @Attribute('range') range: any) {

        if (time !== null) {
            this.defaultSettings.timePicker = true;
            this.defaultSettings.calendarOptions.timepicker = true;
            this.defaultSettings.inputFormat = 'dd/MM/y, hh:mm a';
        }

        if (range !== null) {
            this.defaultSettings.calendarOptions.range = true;
        }

    }

    @HostListener('click', ['$event']) onClickHost(ev: MouseEvent) {
        if (this.isDisabled) {
            ev.stopPropagation();
        }
    }

    ngOnInit(): void {
        this.settings = mergeObjs(this.defaultSettings, this.settings);
        this.timeClass = this.settings.timePicker;
    }

    //#region ControlValueAccessor
    writeValue(value: any) {

        if (hasValue(this._value)) {

            this._value = value;

            if (this._viewInitialized) {
                this._noReadEvent = true;
                this.setValue();
            }

        } else {
            this._value = value;
            this._picker?.clear();
            this.selectedDate = null;
        }
    }

    private onChangeCallback: (_: any) => void = noop;
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }


    private onTouchedCallback: (_: any) => void = noop;
    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;

        if (isDisabled) {
            this._elementRef.nativeElement.disabled = true;
        } else {
            delete this._elementRef.nativeElement.disabled;
        }
    }
    //#endregion

    ngOnChanges(changes: SimpleChanges) {

        if (changes.settings && !changes.settings.firstChange) {
            this.settings = Object.assign(this.defaultSettings, this.settings);
            this._picker.update(this.settings.calendarOptions);
        }

    }

    ngAfterViewInit(): void {

        this._picker = new AirDatepicker(this._pickerEl.nativeElement, {
            ...this.settings.calendarOptions,
            inline: true,
            locale: localeEs,
            showOtherMonths: true,
            // selectedDates: [this._value],

            onSelect: ({ date }) => {

                // console.log(date);

                if (!this._noReadEvent && date?.[0]) {
                    this.selectedDate = date[0];
                } else {
                    this._noReadEvent = false;
                }
            },
            onShow: () => {
                this.isActive = true;
                this.focus.emit();
            },
            onHide: () => {
                this.isActive = false;
                this.blur.emit();
            },
            onRenderCell: params => {
                this.onRenderCell.emit(params);
            }
        });


        if (hasValue(this._value)) {
            this.setValue();
        }

        let parent = this._elementRef.nativeElement.parentElement;

        while (hasValue(parent)) {

            if (inArray(getComputedStyle(parent).overflowY, ['auto', 'scroll', 'overlay']) || inArray(getComputedStyle(parent).overflowX, ['auto', 'scroll', 'overlay'])) {
                this._parents.push(parent);
            }

            parent = parent.parentElement;
        }

        this._renderer.removeChild(this._elementRef.nativeElement, this._dropdownElem.nativeElement);

        this._viewInitialized = true;

    }

    setValue() {
        this._picker.selectDate(this._value);

        setTimeout(() => {
            // TODO: verificar
            this.selectedDate = this._picker.selectedDates?.[0];
            this.onSelect.emit(this.selectedDate);
            this.onChangeCallback(this.selectedDate);
        });
    }

    clearSelection(e: MouseEvent) {

        this.onClear.emit(this.selectedDate);
        this._picker.clear();

        this.selectedDate = null;
        this.onChangeCallback(null);
        this.onTouchedCallback(null);

        e.stopPropagation();
    }

    //#region dropdown status

    toggleDropdown(evt: any) {

        if (this.isDisabled) {
            return false;
        }

        this.isActive = !this.isActive;

        if (this.isActive) {
            this.openDropdown();
        } else {
            this.closeDropdown();
        }

        evt.preventDefault();
    }

    public openDropdown() {

        if (this.isDisabled) {
            return false;
        }

        this.isActive = true;
        this.focus.emit();

        this.setPositionFixedDropdown();

        const parents$: Observable<any>[] = [
            fromEvent(document, 'scroll'),
            fromEvent(window, 'resize').pipe(debounceTime(200))
        ];

        this._parents.forEach((parent) => {
            parents$.push(fromEvent(parent, 'scroll'));
        });

        this._dropdownSubs$.push(

            merge(
                fromEvent<MouseEvent>(window, 'click')
                    .pipe(filter(e => !this._elementRef.nativeElement.contains(e.target))),

                fromEvent<KeyboardEvent>(window, 'keyup')
                    .pipe(filter(e => e.key.toLowerCase() === 'escape' && this.settings.escapeToClose)),

                fromIntersectionObserver(this._inputControlEl.nativeElement)
                    .pipe(filter(ev => !ev[0].isIntersecting && window.innerWidth > 600))
            )
                .subscribe(() => this.closeDropdown()),

            merge(...parents$).subscribe(() => this.setPositionFixedDropdown())
        );

        this._renderer.appendChild(this._elementRef.nativeElement, this._dropdownElem.nativeElement);

        this.onOpen.emit(true);
    }

    public closeDropdown() {

        this.isActive = false;
        this.blur.emit();

        this._dropdownSubs$.forEach(s => s.unsubscribe());
        this._dropdownSubs$ = [];

        this.onClose.emit(false);
        this._renderer.removeChild(this._elementRef.nativeElement, this._dropdownElem.nativeElement);
    }

    setPositionFixedDropdown() {

        setTimeout(() => {

            const dropdown = (this._dropdownElem.nativeElement as HTMLDivElement);
            const el = (this._elementRef.nativeElement as HTMLElement);

            // this._renderer.setStyle(dropdown, 'width', (el.offsetWidth) + 'px');
            this._renderer.setStyle(dropdown, 'left', (el.getBoundingClientRect().left) + 'px');

            const remainingHeight = document.documentElement.offsetHeight - (dropdown.offsetHeight + el.getBoundingClientRect().top + el.offsetHeight);

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

    //#endregion

    ngOnDestroy(): void {
        this._picker.destroy();
    }

}
