// tslint:disable: component-selector
import { AfterViewInit, Attribute, Component, ContentChild, ElementRef, EventEmitter, forwardRef, HostBinding, HostListener, Input, NgZone, OnInit, Optional, Output, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { map, take } from 'rxjs/operators';
import { inArray } from '../../../utils/array';
import { getFileType, readAsArrayBuffer, readAsDataURL } from '../../../file/read';
import { hasValue } from '../../../utils/check';
import { ImageFileWidthSize, InputImageSettings } from '../file.interface';
import { IFItemDirective } from '../files/input-file-item.directive';
import Compressor from 'compressorjs';

@Component({
    selector: 'ser-input-image',
    templateUrl: './input-image.component.html',
    encapsulation: ViewEncapsulation.None,
    host: { '[class]': 'defaultSettings.classes' },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputImageComponent),
            multi: true
        }
    ]
})
export class InputImageComponent implements OnInit, ControlValueAccessor, AfterViewInit {

    @ViewChild('file') input: ElementRef;
    @ViewChild('preview') previewDiv: ElementRef;
    @HostBinding('class.has-value') noEmpty = false;

    @Input() settings: InputImageSettings;
    @Input() preventBodyDrop = true;

    @Output() focus: EventEmitter<void> = new EventEmitter<void>();
    @Output() blur: EventEmitter<void> = new EventEmitter<void>();
    @Output() onSelect: EventEmitter<any> = new EventEmitter<any>();
    @Output() onClear: EventEmitter<any> = new EventEmitter<any>();
    @Output() onClearInstance: EventEmitter<any> = new EventEmitter<any>();

    @ContentChild(IFItemDirective, { static: true }) itemTempl: IFItemDirective;

    hasValue = hasValue;
    isDisabled = false;
    accept = '';

    file: File = null;
    filesInstance = '';

    procesing = false;

    defaultSettings: InputImageSettings = {
        removeText: 'Remover imagen',
        uploadText: 'Seleccionar imagen',
        procesingText: 'Procesando...',
        uploadIconHTML: '<span class="material-icons-outlined">photo_camera</span>',
        clearIconHTML: '<span class="material-icons-outlined">delete</span>',
        classes: '',
        optimize: {
            enable: true,
            strict: true,
            maxWidth: ImageFileWidthSize.FULLHD,
            maxHeight: Infinity,
            quality: 1.0
        },
        accept: ['.png', '.jpg', '.jpeg']
    };

    constructor(private _renderer: Renderer2, private _ngZone: NgZone, @Optional() @Attribute('no-optimize') noOptimizeAtt: any, @Optional() @Attribute('accept') accept: any) {

        if (noOptimizeAtt != null) {
            this.defaultSettings.optimize.enable = false;
        }

        if (accept != null) {
            this.defaultSettings.accept = accept;
        }
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

            if (obj instanceof File) {
                this.file = obj;
            } else if (typeof obj === 'string') {
                this.filesInstance = obj;
            }

            this.setPreview();
            this.noEmpty = true;

        }

    }

    ngOnInit() {
        this.settings = Object.assign(this.defaultSettings, this.settings);
        this.accept = this.settings.accept.join(',');
    }

    ngAfterViewInit() {

    }

    onClick() {
        this.input.nativeElement.click();
    }

    setPreview() {

        setTimeout(() => {
            if (hasValue(this.file)) {

                readAsDataURL(this.file)
                .pipe(take(1))
                .subscribe((result) => {
                    this._renderer.setStyle(this.previewDiv.nativeElement, 'background-image', `url(${result})`);
                });

            } else if (hasValue(this.filesInstance)) {

                this._renderer.setStyle(this.previewDiv.nativeElement, 'background-image', `url(${this.filesInstance})`);

            } else {

                this._renderer.removeStyle(this.previewDiv.nativeElement, 'background-image');

            }
        });

    }

    setValue() {
        this.onChange(this.file);
        this.filesInstance = null;
    }

    assingFile(file: File) {
        this.file = new File([file], file.name.toLowerCase());
        this.onSelect.emit(this.file);
        this.setValue();
        this.setPreview();
        this.noEmpty = true;
    }

    setFile(ev: any) {

        let file = new File([], '');

        if (ev instanceof DragEvent) {

            file = Array.from(ev.dataTransfer.files)[0];
            ev.dataTransfer.clearData();

        } else if (ev instanceof Event) {

            file = Array.from((ev.target as HTMLInputElement).files)[0];
            (ev.target as HTMLInputElement).value = null;

        }

        if (this.settings.optimize.enable) {

            this.procesing = true;

            new Compressor(file, {
                strict: this.settings.optimize.strict,
                quality: this.settings.optimize.quality,
                maxWidth: this.settings.optimize.maxWidth,
                maxHeight: this.settings.optimize.maxHeight,
                success: (result) => {

                    this._ngZone.run(() => {
                        this.procesing = false;
                        this.assingFile(new File([result], file.name.toLowerCase(), {type: file.type}));
                    });

                },
                error: e => {
                    console.error(e);

                    this._ngZone.run(() => {
                        this.procesing = false;
                        this.file = new File([file], file.name.toLowerCase(), {type: file.type});
                        this.onSelect.emit(this.file);
                        this.setValue();
                    });

                },
            });

        } else {
            this.assingFile(file);
        }
    }

    clear() {

        if (hasValue(this.filesInstance)) {
            this.onClearInstance.emit(this.filesInstance);
        } else {
            this.onClear.emit(this.file);
        }

        this.file = null;
        this.filesInstance = null;
        this.onChange(null);
        this.setValue();
        this.setPreview();

        this.noEmpty = false;
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
