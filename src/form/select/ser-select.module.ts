// tslint:disable: max-line-length

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SerSelectListFilterPipe } from './ser-select-list-filter.pipe';
import { SDBadgeDirective, SDItemDirective, SDSearchDirective } from './ser-select-menu-item.directive';
import { SerSelectComponent } from './ser-select.component';
import { DataService } from './ser-select.service';
import { VirtualScrollerModule } from './virtual-scroll/virtual-scroll';

const dependencies = [
    SerSelectComponent,
    SerSelectListFilterPipe,
    SDItemDirective,
    SDBadgeDirective,
    SDSearchDirective
];

@NgModule({
    imports: [CommonModule, BrowserModule, FormsModule, VirtualScrollerModule],
    declarations: [...dependencies],
    exports: [...dependencies],
    providers: [DataService]
})
export class SerSelectModule { }
