import { InputFloatDirective } from './input-float.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SerFormElementComponent } from './ser-form-element/ser-form-element.component';
import { SerControlDirective } from './ser-form-element/ser-control.directive';
import { SerErrorDirective } from './ser-errors/ser-error.directive';
import { SerErrorsDirective } from './ser-errors/ser-errors.directive';
import { PinInputComponent } from './pin/pin-input.component';
import { SerSelectModule } from './select/ser-select.module';
import { AddressColComponent } from './address/address-col/address-col.component';
import { SerFilterModule } from './filter/ser-filter.module';
import { SerDateModule } from './date/ser-date.module';
import { GrowOnInputDirective } from './grow-on-input.directive';
import { InputRegexDirective } from './input-regex.directive';
import { InputRegexOnlyDirective } from './input-regex-only.directive';
import { InputLowerCaseDirective } from './input-lower-case.directive';
import { InputNameCaseDirective } from './input-name-case.directive';
import { InputIntegerDirective } from './input-integer.directive';
import { InputNumberComponent } from './input-number/input-number.component';
import { SerMaskModule } from './mask/ser-mask.module';
import { InputCurrencyComponent } from './input-currency/input-currency.component';
import { SerFormFileModule } from './file/file.module';

const dependencies = [
    SerFormElementComponent,
    SerControlDirective,
    SerErrorsDirective,
    SerErrorDirective,
    PinInputComponent,
    AddressColComponent,
    InputNumberComponent,
    InputCurrencyComponent,
    GrowOnInputDirective,
    InputRegexDirective,
    InputRegexOnlyDirective,
    InputLowerCaseDirective,
    InputNameCaseDirective,
    InputIntegerDirective,
    InputFloatDirective
];

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SerMaskModule.forChild()],
    declarations: [...dependencies],
    exports: [...dependencies, SerSelectModule, SerFilterModule, SerDateModule, SerFormFileModule, SerMaskModule]
})
export class SerFormModule { }
