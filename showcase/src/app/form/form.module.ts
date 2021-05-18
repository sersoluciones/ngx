import { NgModule } from '@angular/core';

import { FormRoutingModule } from './form-routing.module';
import { BasicComponent } from './basic/basic.component';
import { SharedModule } from '../shared/shared.module';
import { ExtrasComponent } from './extras/extras.component';
import { FileComponent } from './file/file.component';
import { PinComponent } from './pin/pin.component';


@NgModule({
    declarations: [
        BasicComponent,
        ExtrasComponent,
        FileComponent,
        PinComponent
    ],
    imports: [
        SharedModule,
        FormRoutingModule
    ]
})
export class FormModule { }
