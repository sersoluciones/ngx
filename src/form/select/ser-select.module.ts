// tslint:disable: max-line-length

import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListFilterPipe } from './list-filter';
import { SDBadgeDirective, SDItemDirective, SDSearchDirective } from './menu-item';
import { SerSelectComponent } from './ser-select.component';
import { DataService } from './ser-select.service';
import { VirtualScrollerModule } from './virtual-scroll/virtual-scroll';

const dependencies = [
    SerSelectComponent,
    ListFilterPipe,
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
