import { NgModule } from '@angular/core';

import { SelectRoutingModule } from './select-routing.module';
import { BasicComponent } from './basic/basic.component';
import { SharedModule } from '../shared/shared.module';
import { OptionsComponent } from './options/options.component';
import { TemplatesComponent } from './templates/templates.component';
import { RemoteComponent } from './remote/remote.component';

import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
    declarations: [
        BasicComponent,
        OptionsComponent,
        TemplatesComponent,
        RemoteComponent
    ],
    imports: [
        SharedModule,
        MatTabsModule,
        SelectRoutingModule
    ]
})
export class SelectModule { }
