import { NgModule } from '@angular/core';

import { SplideRoutingModule } from './splide-routing.module';
import { SplideComponent } from './splide.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [
        SplideComponent
    ],
    imports: [
        SharedModule,
        SplideRoutingModule
    ]
})
export class SplideModule { }
