import { SerFormModule } from './../../../../src/form/ser-form.module';
import { SerUiModule } from './../../../../src/ui/ser-ui.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightModule } from 'ngx-highlightjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SerMaskModule } from '../../../../src/form/mask/ser-mask.module';


const modules = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HighlightModule,
    SerUiModule,
    SerFormModule,
    SerMaskModule
];

@NgModule({
    declarations: [],
    imports: modules,
    exports: modules
})
export class SharedModule { }
