// tslint:disable: component-selector
import { AfterViewInit, Attribute, Component, ContentChild, ElementRef, EventEmitter, forwardRef, HostBinding, HostListener, Input, OnInit, Optional, Output, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { hasValue } from '../../utils/check';
import { IFItemDirective } from './input-file-item.directive';
import { InputFileSettings } from './input-file.interface';

@Component({
    selector: 'ser-input-file',
    templateUrl: './input-file.component.html',
    encapsulation: ViewEncapsulation.None,
    host: { '[class]': 'defaultSettings.classes' },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputFileComponent),
            multi: true
        }
    ]
})
export class InputFileComponent implements AfterViewInit, OnInit, ControlValueAccessor {

    @ViewChildren('file') input: QueryList<ElementRef>;
    @HostBinding('class.show') show = false;

    @Input() settings: InputFileSettings;
    @Input() preventBodyDrop = true;

    @Output() focus: EventEmitter<void> = new EventEmitter<void>();
    @Output() blur: EventEmitter<void> = new EventEmitter<void>();
    @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();
    @Output() onClear: EventEmitter<any> = new EventEmitter<any>();
    @Output() onClearInstance: EventEmitter<any> = new EventEmitter<any>();

    @ContentChild(IFItemDirective, { static: true }) itemTempl: IFItemDirective;

    hasValue = hasValue;
    isDisabled = false;
    multiple = false;

    files: File[] = [];
    filesInstance: string[] = [];

    defaultSettings: InputFileSettings = {
        removeText: 'Remover archivo',
        uploadText: 'Seleccionar archivo',
        uploadMultipleText: 'Seleccionar archivos',
        fileInstanceTitle: 'Clic para ver el archivo guardado',
        uploadIconHTML: '<span class="material-icons">upload</span>',
        classes: '',
        processFilenameUrl: true
    };

    constructor(@Optional() @Attribute('multiple') multipleAttr: any) {
        this.multiple = multipleAttr !== null;
    }

    @HostListener('drop', ['$event'])
    onDrop(event: DragEvent) {
        event.preventDefault();
        this.setFile(event);
    }

    @HostListener('body:dragover', ['$event'])
    onBodyDragOver(event: DragEvent) {
        if (this.preventBodyDrop) {
            event.preventDefault();
            event.stopPropagation();
        }
    }

    @HostListener('body:drop', ['$event'])
    onBodyDrop(event: DragEvent) {
        if (this.preventBodyDrop) {
            event.preventDefault();
        }
    }

    writeValue(obj: any) {

        if (hasValue(obj)) {

            if (Array.isArray(obj)) {

                if (obj[0] instanceof File) {
                    this.files = obj;
                } else if (obj[0] instanceof String) {
                    this.filesInstance = obj;
                }

            } else {

                if (obj instanceof File) {
                    this.files = [obj];
                } else if (typeof obj === 'string') {
                    this.filesInstance = [obj];
                }
            }

        }

    }

    ngOnInit() {
        this.settings = Object.assign(this.defaultSettings, this.settings);
    }

    ngAfterViewInit() {
    }

    getFilenameFromUrl(url: string) {
        if (this.settings.processFilenameUrl) {
            return url.substring(url.lastIndexOf('/') + 1);
        } else {
            return url;
        }
    }

    onClick() {
        this.input.forEach(e => {
            e.nativeElement.click();
        });
    }

    setValue() {
        if (this.multiple) {
            this.onChange(this.files);
        } else {
            this.onChange(this.files[0]);
        }

        this.filesInstance = [];
    }

    setFile(ev: any) {

        if (ev instanceof DragEvent) {

            this.files = Array.from(ev.dataTransfer.files);
            ev.dataTransfer.clearData();

        } else if (ev instanceof Event) {

            (ev.target as HTMLInputElement).value = null;
            this.files = Array.from((ev.target as HTMLInputElement).files);

        }

        if (this.multiple) {
            this.onSelect.emit(this.files);
        } else {
            this.onSelect.emit(this.files[0]);
        }

        this.setValue();
    }

    remove(index: number) {
        this.onClear.emit(this.files[index]);
        this.files.splice(index, 1);
        this.setValue();
    }

    removeName(index: number) {
        this.onClearInstance.emit(this.filesInstance[index]);
        this.filesInstance.splice(index, 1);

        if (this.filesInstance.length === 0) {
            this.onChange(null);
        }
    }

    onFocus() {
        this.focus.emit();
    }

    onBlur() {
        this.blur.emit();
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    onChange(_: any) { }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }
    onTouch() { }

    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }
}
