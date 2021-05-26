import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicComponent } from './basic/basic.component';
import { ImageComponent } from './image/image.component';

const routes: Routes = [
    { path: 'basic', component: BasicComponent },
    { path: 'image', component: ImageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileRoutingModule { }
