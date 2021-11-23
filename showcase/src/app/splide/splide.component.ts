import { Component } from '@angular/core';
import { BaseView } from '../base/base-view';

@Component({
    selector: 'showcase-splide',
    templateUrl: './splide.component.html',
    styleUrls: ['./splide.component.scss']
})
export class SplideComponent extends BaseView {

    images = [
        { src: 'assets/images/splide/dapa-918161_1920.jpg' },
        { src: 'assets/images/splide/flamingos-4240669_1920.jpg' },
        { src: 'assets/images/splide/salento-996461_1920.jpg' }
    ];

}
