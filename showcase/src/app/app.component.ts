import * as L from 'leaflet';
import { MapService } from './../../../src/map/map.service';
import { LeafletMap } from './../../../src/map/leaflet/main';
import { PrefersColorSchemeService } from './../../../src/prefers-color-scheme/prefers-color-scheme.service';
import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { BaseView } from './base/base-view';
import { LEAFLET_MAP_LAYERS } from '../../../src/map/leaflet/providers';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent extends BaseView {

    leafletInstance: LeafletMap;

    constructor(protected injectorObj: Injector, public colorScheme: PrefersColorSchemeService, private _map: MapService) {
        super(injectorObj);
    }

    init() {
        // this.colorScheme.init();
        this.colorScheme.watch();

        console.log('%cPowered by SER', 'color: white;background-color: #653182;padding: 8px; border-radius: 4px;margin: 8px 0;');
        console.log('https://www.sersoluciones.com/');
        console.log('%c📟 DEBUG MODE ENABLED', 'color: limegreen;border: 1px solid limegreen;padding: 8px; border-radius: 4px;margin: 8px 0;');
    }

    afterInit() {
        super.afterInit();

        this.leafletInstance = new LeafletMap({
            container: 'map',
            layersOptions: {
                position: 'bottomright'
            },
            zoom: {
                position: 'bottomright'
            },
            fullscreen: {
                title: {
                    false: 'view_fullscreen',
                    true: 'exit_fullscreen'
                },
                position: 'bottomright'
            }
        });
    }
}
