import { Subscription } from 'rxjs';
import { OnInit, OnDestroy, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { ControlValueAccessor, FormBuilder } from '@angular/forms';
export declare class AddressColComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
    private _fb;
    private _renderer;
    private _elementRef;
    class: boolean;
    viaOptionsEl: ElementRef;
    viaElCont: ElementRef;
    viaEl: ElementRef;
    viaElHint: ElementRef;
    address1: ElementRef;
    modelSub: Subscription;
    modelForm: import("@angular/forms").FormGroup;
    viaOptionsSubs: Subscription[];
    viaRegex: RegExp;
    viaOptions: string[];
    viaOptionsOriginal: string[];
    constructor(_fb: FormBuilder, _renderer: Renderer2, _elementRef: ElementRef);
    writeValue(obj: any): void;
    generateValue(): string;
    registerOnChange(fn: any): void;
    onChange(_: any): void;
    registerOnTouched(fn: any): void;
    onTouch(): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    openViaOptions(): void;
    closeDropdown(): void;
    setPositionDropdown(): void;
    filterViaOptions(value: string): void;
    viaBlur(): void;
    setVia(value: string): void;
    ngOnDestroy(): void;
}
