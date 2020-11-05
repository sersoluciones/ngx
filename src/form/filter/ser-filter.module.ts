import { ReactiveFormsModule } from '@angular/forms';
// tslint:disable: max-line-length

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SerFilterComponent } from './ser-filter.component';

const dependencies = [
    SerFilterComponent
];

@NgModule({
    imports: [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule],
    declarations: [...dependencies],
    exports: [...dependencies],
    providers: []
})
export class SerFilterModule { }
