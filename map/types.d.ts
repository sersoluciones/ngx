export interface LatLng {
    lat: number;
    lng: number;
}
/**
 * @description
 * Interface que representa al objeto OpenId usado para autenticarse con la API de SER
 */
export interface LatLng2LatLngOptions {
    from: {
        lat: number;
        lng: number;
    };
    to: {
        lat: number;
        lng: number;
    };
}
export interface CenterPoint {
    lat: number;
    lng: number;
    offset_x?: number;
    offset_y?: number;
    preserve_zoom?: boolean;
}
