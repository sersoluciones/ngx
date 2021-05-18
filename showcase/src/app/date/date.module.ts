import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';

import { DateRoutingModule } from './date-routing.module';
import { BasicComponent } from './basic/basic.component';
import { RangeComponent } from './range/range.component';
import { UtilsComponent } from './utils/utils.component';


@NgModule({
  declarations: [BasicComponent, RangeComponent, UtilsComponent],
  imports: [
    SharedModule,
    DateRoutingModule
  ]
})
export class DateModule { }
