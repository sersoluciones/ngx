import { Component } from '@angular/core';
import { BaseView } from './base/base-view';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseView {

    init() {
        // this.colorscheme.init();
        // this.colorscheme.watch();

        console.log('%cPowered by SER', 'color: white;background-color: #653182;padding: 8px; border-radius: 4px;margin: 8px 0;');
        console.log('https://www.sersoluciones.com/');
        console.log('%c📟 DEBUG MODE ENABLED', 'color: limegreen;border: 1px solid limegreen;padding: 8px; border-radius: 4px;margin: 8px 0;');

        // console.group('%c[debug]', 'color: limegreen;');

        // console.groupCollapsed('JWT token');
        // console.log(auth.getJwtToken());
        // console.groupEnd();

        console.groupEnd();
    }
}
