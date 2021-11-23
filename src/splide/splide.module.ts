import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplideComponent } from './splide.component';
import { SplideSlideComponent } from './splide-slide.component';

@NgModule({
    declarations: [ SplideComponent, SplideSlideComponent ],
    imports: [ CommonModule ],
    exports: [ SplideComponent, SplideSlideComponent ]
})
export class SerSplideModule {}
