import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFileComponent } from './files/input-file.component';
import { IFItemDirective } from './files/input-file-item.directive';
import { InputImageComponent } from './images/input-image.component';
import { SerUiModule } from '../../ui/ser-ui.module';

const dependencies = [
    InputFileComponent,
    InputImageComponent,
    IFItemDirective
];

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SerUiModule],
    declarations: [...dependencies],
    exports: [...dependencies],
    providers: []
})
export class SerFormFileModule { }
