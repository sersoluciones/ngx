import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LatLng2LatLngOptions } from './types';

@Injectable({
    providedIn: 'root'
})
export class MapService {

    /**
     * Metodo para obtener la posisión GPS actual usando Observable
     * @example
     * this.mapService.getCurrentPosition().pipe(take(1)).subscribe({
     *      next(position) {
     *        console.log('Current Position: ', position);
     *      },
     *      error(msg) {
     *        console.log('Error Getting Location: ', msg);
     *      }
     *   });
     */
    getCurrentPosition(): Observable<Position> {

        return new Observable((observer) => {

            // Simple geolocation API check provides values to publish
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition((position: Position) => {
                    observer.next(position);
                }, (error: PositionError) => {
                    observer.error(error);
                });
            } else {
                observer.error('Geolocation not available');
            }
        });
    }

    /**
     * Verifica si la latitud y longitud son válidas
     * @param lat Latitud
     * @param lng Longitud
     */
    checkLatLog(lat: number, lng: number) {
        return (-90 <= lat) && (90 >= lat) && (-180 <= lng) && (180 >= lng);
    }

    /**
     * Obtiene la distancia en km entre dos puntos LatLng
     * @param lon1 Latitud
     */
    distancePoints(options: LatLng2LatLngOptions) {
        // tslint:disable-next-line: max-line-length
        const a = Math.sin(((options.to.lat - options.from.lat) * Math.PI / 180) / 2) * Math.sin(((options.to.lat - options.from.lat) * Math.PI / 180) / 2) + Math.cos(options.from.lat * Math.PI / 180) * Math.cos(options.to.lat * Math.PI / 180) * Math.sin(((options.to.lng - options.from.lng) * Math.PI / 180) / 2) * Math.sin(((options.to.lng - options.from.lng) * Math.PI / 180) / 2);
        return (6371 * (2 * Math.asin(Math.sqrt(a)))) * 1.60934;
    }

    cutPrecision(obj: any, precision: number) {
        if ('number' === typeof obj[0]) {
            for (let i = 0; i < obj.length; i++) { obj[i] = Math.round(obj[i] * precision) / precision; }
        } else {
            const arr = obj.features || obj.geometries || obj.coordinates || obj;
            for (let i = 0; i < arr.length; i++) { this.cutPrecision(arr[i], precision); }
        }
    }

    middlePoint(options: LatLng2LatLngOptions) {

        if ((options.from.lng !== options.to.lng) || (options.from.lat !== options.to.lat)) {

            const lat1 = options.from.lat * Math.PI / 180;
            const lat2 = options.to.lat * Math.PI / 180;
            const lon1 = options.from.lng * Math.PI / 180;
            const lon2 = options.to.lng * Math.PI / 180;
            const dLon = lon2 - lon1;
            const x = Math.cos(lat2) * Math.cos(dLon);
            const y = Math.cos(lat2) * Math.sin(dLon);
            let lat3 = Math.atan2(Math.sin(lat1) + Math.sin(lat2), Math.sqrt((Math.cos(lat1) + x) * (Math.cos(lat1) + x) + y * y));
            let lon3 = lon1 + Math.atan2(y, Math.cos(lat1) + x);
            lat3 *= 180 / Math.PI;
            lon3 *= 180 / Math.PI;
            const deltaY = options.to.lng - options.from.lng;
            const deltaX = options.to.lat - options.from.lat;
            const angleInDegrees = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
            return {
                longitude: lon3,
                Latitude: lat3,
                angle: angleInDegrees,
                distance: this.distancePoints(options)
            };
        } else {
            return false;
        }

    }
}
