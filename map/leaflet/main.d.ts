import * as L from 'leaflet';
import 'leaflet.markercluster';
import '@sersol/leaflet-plugins/leaflet-fullscreen';
import '@sersol/leaflet-plugins/leaflet-mouseposition';
import { LeafletMapOptions, LeafletPadding } from './types';
import { CenterPoint, LatLng } from '../types';
export declare class LeafletMap {
    map: L.Map;
    markers: any;
    markerCluster: L.MarkerClusterGroup;
    layerControl: L.Control.Layers;
    options: LeafletMapOptions;
    constructor(options: LeafletMapOptions);
    initMarkerCluster(): void;
    fitMarkersBounds(padding?: LeafletPadding, flyTo?: boolean): void;
    addMarker(latLng: LatLng, id: any): any;
    panTo(latlng: L.LatLng, offset?: L.PointExpression, options?: L.ZoomPanOptions): L.Map;
    setView(latlng: L.LatLng, targetZoom: number, offset?: L.PointExpression, options?: L.ZoomPanOptions): L.Map;
    centerPoint(options: CenterPoint): void;
}
