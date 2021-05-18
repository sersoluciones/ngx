import { UtilsComponent } from './utils/utils.component';
import { RangeComponent } from './range/range.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicComponent } from './basic/basic.component';

const routes: Routes = [
    { path: 'basic', component: BasicComponent },
    { path: 'range', component: RangeComponent },
    { path: 'utils', component: UtilsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DateRoutingModule { }
