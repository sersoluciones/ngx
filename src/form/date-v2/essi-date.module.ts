// import { SerDateRangeComponent } from './range/essi-date-range.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EssiDateComponent } from './essi-date.component';

const dependencies = [
    EssiDateComponent,
    // SerDateRangeComponent
];

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [...dependencies],
    exports: [...dependencies],
    providers: []
})
export class EssiDateModule { }
