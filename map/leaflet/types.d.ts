import * as L from 'leaflet';
import 'leaflet.markercluster';
import '@sersol/leaflet-plugins/leaflet-fullscreen';
export interface LeafletMapOptions {
    container: string;
    initialView?: {
        lat?: number;
        lng?: number;
        zoom?: number;
    };
    clusterMarkers?: {
        enable?: boolean;
        config?: L.MarkerClusterGroupOptions;
    };
    layers?: any;
    mapOptions?: {
        positionControl?: boolean;
        layers?: any[];
        zoomControl: any;
    };
    fullscreen?: L.Control.FullscreenOptions;
    zoom?: L.Control.ZoomOptions;
    layersOptions?: L.Control.LayersOptions;
    mousePositionOptions?: L.Control.MousePositionOptions;
}
export interface LeafletPadding {
    paddingTopLeft?: {
        x?: number;
        y?: number;
    };
    paddingBottomRight?: {
        x?: number;
        y?: number;
    };
}
