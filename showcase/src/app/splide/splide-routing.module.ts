import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplideComponent } from './splide.component';

const routes: Routes = [{ path: '', component: SplideComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SplideRoutingModule { }
