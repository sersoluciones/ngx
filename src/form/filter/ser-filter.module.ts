// tslint:disable: max-line-length

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SerFilterListFilterPipe } from './ser-filter-list-filter.pipe';
import { SerFilterComponent } from './ser-filter.component';

const dependencies = [
    SerFilterComponent,
    SerFilterListFilterPipe
];

@NgModule({
    imports: [CommonModule, BrowserModule, FormsModule],
    declarations: [...dependencies],
    exports: [...dependencies],
    providers: []
})
export class SerFilterModule { }
