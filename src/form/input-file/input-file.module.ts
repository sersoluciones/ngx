import { ReactiveFormsModule } from '@angular/forms';
// tslint:disable: max-line-length

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFileComponent } from './input-file.component';
import { IFItemDirective } from './input-file-item.directive';

const dependencies = [
    InputFileComponent,
    IFItemDirective
];

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [...dependencies],
    exports: [...dependencies],
    providers: []
})
export class SerInputFileModule { }
