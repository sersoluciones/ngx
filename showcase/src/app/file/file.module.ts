import { NgModule } from '@angular/core';

import { FileRoutingModule } from './file-routing.module';
import { BasicComponent } from './basic/basic.component';
import { SharedModule } from '../shared/shared.module';
import { ImageComponent } from './image/image.component';


@NgModule({
    declarations: [
        BasicComponent,
        ImageComponent
    ],
    imports: [
        SharedModule,
        FileRoutingModule
    ]
})
export class FileModule { }
