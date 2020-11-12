import { PrefersColorSchemeService } from './../../../src/prefers-color-scheme/prefers-color-scheme.service';
import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { BaseView } from './base/base-view';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent extends BaseView {

    constructor(protected injectorObj: Injector, private _colorScheme: PrefersColorSchemeService) {
        super(injectorObj);
    }

    init() {
        this._colorScheme.init();
        this._colorScheme.watch();

        console.log('%cPowered by SER', 'color: white;background-color: #653182;padding: 8px; border-radius: 4px;margin: 8px 0;');
        console.log('https://www.sersoluciones.com/');
        console.log('%c📟 DEBUG MODE ENABLED', 'color: limegreen;border: 1px solid limegreen;padding: 8px; border-radius: 4px;margin: 8px 0;');
    }
}
