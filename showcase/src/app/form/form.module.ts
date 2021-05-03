import { NgModule } from '@angular/core';

import { FormRoutingModule } from './form-routing.module';
import { BasicComponent } from './basic/basic.component';
import { SharedModule } from '../shared/shared.module';
import { ExtrasComponent } from './extras/extras.component';


@NgModule({
    declarations: [
        BasicComponent,
        ExtrasComponent
    ],
    imports: [
        SharedModule,
        FormRoutingModule
    ]
})
export class FormModule { }
