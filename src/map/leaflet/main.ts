import * as L from 'leaflet';
import 'leaflet.markercluster';
import '@sersol/leaflet-plugins/leaflet-fullscreen';
import '@sersol/leaflet-plugins/leaflet-mouseposition';
import { mergeObjs } from '../../utils/object';
import { hasValue } from '../../utils/check';
import { LeafletMapOptions, LeafletPadding } from './types';
import { CenterPoint, LatLng } from '../types';
import { LEAFLET_MAP_LAYERS } from './providers';

export class LeafletMap {
    map: L.Map;
    markers: any = {};
    markerCluster: L.MarkerClusterGroup;
    layerControl: L.Control.Layers;
    options: LeafletMapOptions = {
        container: 'leaflet-map',
        initialView: {
            lat: 4.6288702,
            lng: -74.1193724,
            zoom: 11
        },
        clusterMarkers: {
            enable: true,
            config: {}
        },
        layers: LEAFLET_MAP_LAYERS,
        mapOptions: {
            positionControl: true,
            layers: [LEAFLET_MAP_LAYERS['Mapbox Street']],
            zoomControl: false
        },
        layersOptions: {
            position: 'topright'
        }
    };

    constructor(options: LeafletMapOptions) {

        mergeObjs(this.options, options);

        this.map = new L.Map(this.options.container, this.options.mapOptions);

        this.layerControl = new L.Control.Layers(this.options.layers, null, this.options.layersOptions);
        this.map.addControl(this.layerControl);
        this.map.addControl(new L.Control.Fullscreen(this.options.fullscreen));
        this.map.addControl(new L.Control.Zoom(this.options.zoom));
        this.map.addControl(new L.Control.MousePosition(this.options.mousePositionOptions));

        this.map.setView([this.options.initialView.lat, this.options.initialView.lng], this.options.initialView.zoom);

        // Create cluster and scope
        if (this.options.clusterMarkers.enable) {
            this.initMarkerCluster();
        }

    }

    initMarkerCluster() {
        if (L.MarkerClusterGroup) {
            this.markerCluster = new L.MarkerClusterGroup([], this.options.clusterMarkers.config);
            this.map.addLayer(this.markerCluster);
        }
    }

    fitMarkersBounds(padding?: LeafletPadding, flyTo?: boolean) {

        if (hasValue(this.markers)) {

            const groupWrapper = [];

            // tslint:disable-next-line: forin
            for (const key in this.markers) {
                groupWrapper.push(this.markers[key]);
            }

            if (hasValue(groupWrapper)) {

                const pad: LeafletPadding = {
                    paddingTopLeft: {
                        x: 0,
                        y: 0
                    },
                    paddingBottomRight: {
                        x: 0,
                        y: 0
                    }
                };

                mergeObjs(pad, padding);

                const group = L.featureGroup(groupWrapper);

                if (flyTo) {
                    this.map.flyToBounds(group.getBounds(), {
                        duration: 0.5,
                        paddingTopLeft: [pad.paddingTopLeft.x, pad.paddingTopLeft.y],
                        paddingBottomRight: [pad.paddingBottomRight.x, pad.paddingBottomRight.y]
                    });
                } else {
                    this.map.fitBounds(group.getBounds(), {
                        paddingTopLeft: [pad.paddingTopLeft.x, pad.paddingTopLeft.y],
                        paddingBottomRight: [pad.paddingBottomRight.x, pad.paddingBottomRight.y]
                    });
                }
            }

        }

    }

    addMarker(latLng: LatLng, id: any) {

        this.markers[id] = L.marker([latLng.lat, latLng.lng]);

        if (this.options.clusterMarkers.enable) {
            this.markerCluster.addLayer(this.markers[id]);
        } else {
            this.markers[id].addTo(this.map);
        }

        return this.markers[id];
    }

    panTo(latlng: L.LatLng, offset?: L.PointExpression, options?: L.ZoomPanOptions) {

        if (hasValue(offset)) {
            const x = this.map.latLngToContainerPoint(latlng).x - offset[0];
            const y = this.map.latLngToContainerPoint(latlng).y - offset[1];
            const point = this.map.containerPointToLatLng([x, y]);
            return this.map.setView(point, this.map.getZoom(), options);
        } else {
            return this.map.setView(latlng, this.map.getZoom(), options);
        }
    }

    setView(latlng: L.LatLng, targetZoom: number, offset?: L.PointExpression, options?: L.ZoomPanOptions) {

        if (hasValue(offset)) {
            const targetPoint = this.map.project(latlng, targetZoom).subtract(offset);
            const targetLatLng = this.map.unproject(targetPoint, targetZoom);
            return this.map.setView(targetLatLng, targetZoom, options);
        } else {
            return this.map.setView(latlng, targetZoom, options);
        }

    }

    centerPoint(options: CenterPoint) {
        this.map.flyTo([options.lat, options.lng], options.preserve_zoom ? this.map.getZoom() : 19, {
            duration: 0.5
        });
    }

}
