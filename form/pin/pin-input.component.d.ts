import { AfterViewInit, ElementRef, OnInit, QueryList } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class PinInputComponent implements AfterViewInit, OnInit, ControlValueAccessor {
    inputsList: QueryList<ElementRef>;
    show: boolean;
    private inputs;
    codeLength: number;
    onlyNumber: boolean;
    isCodeHidden: boolean;
    codeInputs: number[] | string[];
    value: any[];
    type: string;
    isDisabled: boolean;
    writeValue(obj: any): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    private canInputValue;
    generateValue(): string | number;
    onInput(e: any, i: number): void;
    onKeydown(e: KeyboardEvent, i: number): Promise<void>;
    onClick(e: any): void;
    registerOnChange(fn: any): void;
    onChange(_: any): void;
    registerOnTouched(fn: any): void;
    onTouch(): void;
    setDisabledState?(isDisabled: boolean): void;
}
