import { Component, OnInit, OnDestroy, SimpleChanges, OnChanges, ViewEncapsulation, forwardRef, AfterViewInit, ElementRef, Input, EventEmitter, Output, Attribute, Optional, HostBinding, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { hasValue } from '../../../utils/check';
import { mergeObjs, noop } from '../../../utils/object';
import { Datepicker } from '../base/datepicker';
import { DateInputSettings } from '../ser-date.interface';

@Component({
    selector: 'ser-date',
    templateUrl: './ser-date.component.html',
    host: { '[class]': 'defaultSettings.classes' },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SerDateComponent),
            multi: true
        }
    ],
    encapsulation: ViewEncapsulation.None
})
export class SerDateComponent implements OnInit, ControlValueAccessor, OnChanges, AfterViewInit, OnDestroy {

    @HostBinding('class.time-picker') timeClass = false;
    @HostBinding('class.disabled') isDisabled = false;
    @HostBinding('class.active') isActive = false;

    @Input() settings: DateInputSettings;

    @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();
    @Output() onDeSelect: EventEmitter<any> = new EventEmitter<any>();
    @Output() onClear: EventEmitter<any> = new EventEmitter<any>();
    @Output() onOpen: EventEmitter<any> = new EventEmitter<any>();
    @Output() onClose: EventEmitter<any> = new EventEmitter<any>();

    @Output() focus: EventEmitter<void> = new EventEmitter<void>();
    @Output() blur: EventEmitter<void> = new EventEmitter<void>();

    private _viewInitialized = false;
    private _noReadEvent = false;
    private _value: any;
    private _picker: Datepicker;
    selectedDate: Date;

    defaultSettings: DateInputSettings = {
        classes: '',
        timePicker: false,
        inputFormat: 'dd/MM/y',
        clear: true,
        calendarOptions: {}
    };

    constructor(private _elementRef: ElementRef, @Optional() @Attribute('time') time: any) {

        if (time !== null) {
            this.defaultSettings.timePicker = true;
            this.defaultSettings.calendarOptions.timePicker = true;
            this.defaultSettings.inputFormat = 'dd/MM/y, hh:mm a';
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

            if (typeof (value) === 'string' && !(/[zZ]/.test(value))) {
                value = value + 'Z';
            }

            this._value = value;

            if (this._viewInitialized) {
                this._noReadEvent = true;
                this.setValue();
            }

        } else {
            this._value = value;
        }
    }

    // tslint:disable-next-line: member-ordering
    private onChangeCallback: (_: any) => void = noop;
    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }


    // tslint:disable-next-line: member-ordering
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
            this._picker.setOptions(this.settings.calendarOptions);
        }

    }

    ngAfterViewInit(): void {

        this._picker = new Datepicker({
            element: this._elementRef.nativeElement,
            ...this.settings.calendarOptions
        });

        if (hasValue(this._value)) {
            this.setValue();
        }

        this._picker.on('selected', (date1) => {
            if (!this._noReadEvent) {
                this.selectedDate = date1.dateInstance;
                this.onSelect.emit(this.selectedDate);
                this.onChangeCallback(date1.dateInstance);
            } else {
               this._noReadEvent = false;
            }
        });

        this._picker.on('show', () => {
            this.isActive = true;
            this.focus.emit();
        });

        this._picker.on('hide', () => {
            this.isActive = false;
            this.blur.emit();
        });

        this._viewInitialized = true;

    }

    setValue() {
        this._picker.setDate(this._value);

        setTimeout(() => {
            this.selectedDate = this._picker.getDate().toJSDate();
        });
    }

    clearSelection(e: MouseEvent) {

        this.onClear.emit(this.selectedDate);
        this._picker.clearSelection();

        this.selectedDate = null;
        this.onChangeCallback(null);
        this.onTouchedCallback(null);

        e.stopPropagation();
    }

    ngOnDestroy(): void {
        this._picker.destroy();
    }

}
