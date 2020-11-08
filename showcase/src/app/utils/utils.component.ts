import { Component, Injector, OnInit } from '@angular/core';
import { FullscreenService } from '../../../../src/fullscreen/fullscreen.service';
import { PrefersColorSchemeService } from '../../../../src/prefers-color-scheme/prefers-color-scheme.service';
import { BaseView } from '../base/base-view';

@Component({
    selector: 'showcase-utils',
    templateUrl: './utils.component.html',
    styleUrls: ['./utils.component.scss']
})
export class UtilsComponent extends BaseView {

    constructor(public colorscheme: PrefersColorSchemeService, public fullscreen: FullscreenService, protected injectorObj: Injector) {
        super(injectorObj);
    }

}
