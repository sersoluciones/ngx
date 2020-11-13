import { ReactiveFormsModule } from '@angular/forms';
// tslint:disable: max-line-length

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SDBadgeDirective, SDBadgeItemDirective, SDItemDirective } from './ser-select-menu-item.directive';
import { SerSelectComponent } from './ser-select.component';
import { DataService } from './ser-select.service';
import { VirtualScrollerModule } from './virtual-scroll/virtual-scroll';

const dependencies = [
    SerSelectComponent,
    SDItemDirective,
    SDBadgeDirective,
    SDBadgeItemDirective
];

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, VirtualScrollerModule],
    declarations: [...dependencies],
    exports: [...dependencies],
    providers: [DataService]
})
export class SerSelectModule { }
