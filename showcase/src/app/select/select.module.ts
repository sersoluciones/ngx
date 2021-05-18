import { NgModule } from '@angular/core';

import { SelectRoutingModule } from './select-routing.module';
import { BasicComponent } from './basic/basic.component';
import { SharedModule } from '../shared/shared.module';
import { OptionsComponent } from './options/options.component';
import { TemplatesComponent } from './templates/templates.component';


@NgModule({
    declarations: [
        BasicComponent,
        OptionsComponent,
        TemplatesComponent
    ],
    imports: [
        SharedModule,
        SelectRoutingModule
    ]
})
export class SelectModule { }
