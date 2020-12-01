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
    mapOptions?: L.MapOptions;
    fullscreen?: L.Control.FullscreenOptions;
    zoomControl?: boolean;
    zoom?: L.Control.ZoomOptions;
    layersControl?: boolean;
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
