import { Observable } from 'rxjs';
import { LatLng2LatLngOptions } from './types';
export declare class MapService {
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
    getCurrentPosition(): Observable<Position>;
    /**
     * Verifica si la latitud y longitud son válidas
     * @param lat Latitud
     * @param lng Longitud
     */
    checkLatLog(lat: number, lng: number): boolean;
    /**
     * Obtiene la distancia en km entre dos puntos LatLng
     * @param lon1 Latitud
     */
    distancePoints(options: LatLng2LatLngOptions): number;
    cutPrecision(obj: any, precision: number): void;
    middlePoint(options: LatLng2LatLngOptions): false | {
        longitude: number;
        Latitude: number;
        angle: number;
        distance: number;
    };
}
