import {Component, TemplateRef, ViewChild} from '@angular/core';

@Component({
    selector: 'splide-slide',
    template: '<ng-template #slideContent><ng-content></ng-content></ng-template>'
})
export class SplideSlideComponent {
    @ViewChild('slideContent')
    public slideContent: TemplateRef<any>;
}
