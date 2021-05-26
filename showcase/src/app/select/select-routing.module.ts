import { TemplatesComponent } from './templates/templates.component';
import { OptionsComponent } from './options/options.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicComponent } from './basic/basic.component';
import { RemoteComponent } from './remote/remote.component';

const routes: Routes = [
    { path: 'basic', component: BasicComponent },
    { path: 'templates', component: TemplatesComponent },
    { path: 'remote', component: RemoteComponent },
    { path: 'options', component: OptionsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectRoutingModule { }
