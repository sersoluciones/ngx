import { PinComponent } from './pin/pin.component';
import { FileComponent } from './file/file.component';
import { ExtrasComponent } from './extras/extras.component';
import { BasicComponent } from './basic/basic.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'basic',
        component: BasicComponent
    },
    {
        path: 'extras',
        component: ExtrasComponent
    },
    {
        path: 'file',
        component: FileComponent
    },
    {
        path: 'pin',
        component: PinComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
