import { SerDateRangeComponent } from './range/ser-date-range.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SerDateComponent } from './single/ser-date.component';

const dependencies = [
    SerDateComponent,
    SerDateRangeComponent
];

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [...dependencies],
    exports: [...dependencies],
    providers: []
})
export class SerDateModule { }
