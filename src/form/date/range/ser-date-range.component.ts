import { Component, OnInit, OnDestroy, SimpleChanges, OnChanges, ViewEncapsulation, forwardRef, AfterViewInit, ElementRef, Attribute, EventEmitter, HostBinding, HostListener, Input, Optional, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { hasValue } from '../../../utils/check';
import { mergeObjs, noop } from '../../../utils/object';
import { Datepicker } from '../base/datepicker';
import { DateInputSettings, DateRangeInputSettings } from '../ser-date.interface';

@Component({
    selector: 'ser-date-range',
    templateUrl: './ser-date-range.component.html',
    host: { '[class]': 'defaultSettings.classes' },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SerDateRangeComponent),
            multi: true
        }
    ],
    encapsulation: ViewEncapsulation.None
})
export class SerDateRangeComponent implements OnInit, ControlValueAccessor, OnChanges, AfterViewInit, OnDestroy {

    @HostBinding('class.time-picker') timeClass = false;
    @HostBinding('class.disabled') isDisabled = false;
    @HostBinding('class.active') isActive = false;

    @Input() settings: DateRangeInputSettings;

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
    selectedDateRange: any;
    hasValue = hasValue;

    defaultSettings: DateRangeInputSettings = {
        classes: '',
        startDateField: 'from',
        endDateField: 'to',
        forceRangeField: 'force',
        timePicker: false,
        inputFormat: 'dd/MM/y',
        clear: true,
        calendarOptions: {
            shortcuts: true,
            singleMode: false,
            splitView: true,
            numberOfMonths: 1,
            numberOfColumns: 1
        }
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

        if (!hasValue(value)) {
            this._picker?.clearSelection();
            this.selectedDateRange = null;
            return;
        }

        const tempValue = JSON.parse(JSON.stringify(value));

        if (!tempValue.hasOwnProperty(this.settings.startDateField)) {
            console.warn(`ser-date-range: start date field name not found: ${this.settings.startDateField}`);
            return;
        }

        if (!tempValue.hasOwnProperty(this.settings.endDateField)) {
            console.warn(`ser-date-range: end date field name not found: ${this.settings.endDateField}`);
            return;
        }

        if (typeof (tempValue[this.settings.startDateField]) === 'string' && !(/[zZ]/.test(tempValue[this.settings.startDateField]))) {
            tempValue[this.settings.startDateField] = tempValue[this.settings.startDateField] + 'Z';
        }

        if (typeof (tempValue[this.settings.endDateField]) === 'string' && !(/[zZ]/.test(tempValue[this.settings.endDateField]))) {
            tempValue[this.settings.endDateField] = tempValue[this.settings.endDateField] + 'Z';
        }

        this._value = tempValue;

        if (this._viewInitialized) {
            this._noReadEvent = true;
            this.setValue();
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

        this._picker.on('selected', (date1, date2) => {
            if (!this._noReadEvent) {

                // console.log(date1.dateInstance, date2.dateInstance);

                const dates = {};
                dates[this.settings.startDateField] = date1.dateInstance;
                dates[this.settings.endDateField] = date2.dateInstance;

                this.selectedDateRange = dates;
                this.onSelect.emit(this.selectedDateRange);
                this.onChangeCallback(dates);

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
        this._picker.setDateRange(this._value[this.settings.startDateField], this._value[this.settings.endDateField], this._value[this.settings.forceRangeField]);

        setTimeout(() => {
            const dates = {};
            dates[this.settings.startDateField] = this._picker.getStartDate().toJSDate();
            dates[this.settings.endDateField] = this._picker.getEndDate().toJSDate();
            this.selectedDateRange = dates;
        });
    }

    clearSelection(e: MouseEvent) {

        this.onClear.emit(this.selectedDateRange);
        this._picker.clearSelection();

        this.selectedDateRange = null;
        this.onChangeCallback(null);
        this.onTouchedCallback(null);

        e.stopPropagation();
    }

    ngOnDestroy(): void {
        this._picker.destroy();
    }

}
