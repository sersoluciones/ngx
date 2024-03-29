import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SDBadgeDirective, SDBadgeItemDirective, SDItemDirective } from './ser-select-menu-item.directive';
import { SerSelectComponent } from './ser-select.component';
import { DataService } from './ser-select.service';
import { SerUiModule } from '../../ui/ser-ui.module';

const dependencies = [
    SerSelectComponent,
    SDItemDirective,
    SDBadgeDirective,
    SDBadgeItemDirective
];

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SerUiModule],
    declarations: [...dependencies],
    exports: [...dependencies],
    providers: [DataService]
})
export class SerSelectModule { }
